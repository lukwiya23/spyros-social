module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = "Username field cannot remain empty"
    }
    if(email.trim() === ''){
        errors.username = "Email field cannot remain empty"
    }
    else{
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if(!email.match(regEx)){
            errors.email = "Email must be valid eg johndoe@email.com"
        }
    }

    if(password === ''){
        errors.password = "Password field cannot remain empty"
    }
    else if(password !== confirmPassword){
        errors.confirmPassword = "Passwords do not match"
    }

    return {errors, valid:Object.keys(errors).length < 1}
}


module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim === ''){
        errors.username = 'Please Enter your username'
    }
    
    if(password.trim === ''){
        errors.password = 'Please Enter your Password'
    }
    return {errors, valid:Object.keys(errors).length < 1}
}