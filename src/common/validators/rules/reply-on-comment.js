const approveBlog = require('./approve-blog')
module.exports = {
    blogId: approveBlog.blogId,
    replyText: {   
        in: ['body'],
        errorMessage: 'commentText is missing',
        exists: true         
    }
}
