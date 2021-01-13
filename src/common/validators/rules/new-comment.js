const approveBlog = require('./approve-blog')
module.exports = {
    blogId: approveBlog.blogId,
    commentText: {   
        in: ['body'],
        errorMessage: 'commentText is missing',
        exists: true         
    }
}
