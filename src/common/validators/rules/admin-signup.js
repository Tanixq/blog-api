module.exports = {
    newAdminUsername: {
        in: ['body'],
        errorMessage: '"newAdminUsername" fleid is missing',
        exists: true
    },
    newAdminPassword: {
        in: ['body'],
        errorMessage: '"newAdminPassword" field is missing',
        exists: true,
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 }
        }
    }
}
