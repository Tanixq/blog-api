module.exports = {
    blogId: {
        in: ['body'],
        errorMessage: '"blogId" fleid is missing',
        exists: true
    }
}
