module.exports = {
    bio: {
        in: ['body'],
        errorMessage: 'bio is missing',
        exists: true,
        isLength: {
            errorMessage: 'bio should only be 160 chars long',
            options: { max: 160 }
        }
    }
}
