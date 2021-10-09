const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config')
const {UserInputError} = require('apollo-server')
const {validateRegisterInput, validateLoginInput} = require('../../utils/validators')

function generateToken(user){
    return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
}, SECRET_KEY, {expiresIn:'1h'});
}
module.exports = {
    Mutation: {

        async login(_,{username, password}){
            const {errors, valid} = validateLoginInput(username, password)

            const user = await User.findOne({username})

            if(!valid){
                throw new UserInputError("Errors", {errors})
            }

            if(!user){
                errors.general = "User not found"
                throw new UserInputError('This user does not exist', {errors})
            }
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general = "Wrong password"
                throw new UserInputError("Wrong password", {errors})
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

       async register(_,{registerInput: {username, email, password, confirmPassword,}}, args, context, info)
{
        //validate user data
        const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword)
        if(!valid){
            throw new UserInputError("Error", {errors})
        }


        //make sure user doesnt already exists
        const user = await User.findOne({username});
        if(user){
        throw new UserInputError("Username already taken..try another", {
            errors: {
                username: "This username is already taken"
            }
        })
        }

        //hash password
        //create auth token
        password = await bcrypt.hash(password, 12)
        
        const newUser = new User({
            email,
            username,
            password,
            createdAt: new Date().toISOString()
        });

        const res = await newUser.save()
        const token = generateToken(res)
        return {
            ...res._doc,
            id: res._id,
            token
        }
        }
    }
}