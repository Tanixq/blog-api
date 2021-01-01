module.exports = {
    new_admin_username: {
        in: ['body'],
        errorMessage: '"new_admin_username" fleid is missing',
        exists: true,
    },
    new_admin_password: {
        in: ['body'],
        errorMessage: '"new_admin_password" field is missing',
        exists: true,
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 },
        },
    }
}