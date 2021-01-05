module.exports = {
    firstName: {
        in: ['body'],
        errorMessage: '"firstName" field is missing',
        exists: true
    },
    lastName: {
        in: ['body'],
        errorMessage: '"lastName" field is missing',
        exists: true
    },
    email: {
        in: ['body'],
        errorMessage: '"email" field is missing',
        exists: true,
        isEmail: {
            errorMessage: 'Invalid email format'
        }
    },
    password: {
        in: ['body'],
        errorMessage: '"password" field is missing',
        exists: true,
        isLength: {
            errorMessage: 'Password should be at least 8 chars long',
            options: { min: 8 }
        }
    },
    bio: {
        in: ['body'],
        isLength: {
            errorMessage: 'bio should only be 160 chars long',
            options: { max: 160 }
        }
    }
}
