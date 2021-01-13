module.exports = {
    commentId: {   
        in: ['body'],
        errorMessage: '"commentId" field is missing',
        exists: true         
    }
}
