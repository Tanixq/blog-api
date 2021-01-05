module.exports = {
    blog_id: {
        in: ['body'],
        errorMessage: '"blog_id" fleid is missing',
        exists: true
    }
}
