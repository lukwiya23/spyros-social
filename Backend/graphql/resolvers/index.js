const postsResolver = require('./post')
const usersResolver = require('./user')
const commentResolvers = require('./comments')

module.exports = {
    Post: {
        likeCount(parent){
            console.log(parent)
            return parent.likes.length
        },
        commentCount(parent){
            console.log(parent)
            return parent.comments.length
        }
    },

    Query:{
        ...postsResolver.Query
    },
    Mutation: {
        ...usersResolver.Mutation,
        ...postsResolver.Mutation,
        ...commentResolvers.Mutation
    }
}