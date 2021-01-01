module.exports = {
    first_name:{
        in: ['body'],
        errorMessage: '"first_name" field is missing',
        exists: true,
      },
    last_name: {
        in: ['body'],
        errorMessage: '"last_name" field is missing',
        exists: true
    },
    email: {
        in: ['body'],
        errorMessage: '"Email" field is missing',
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
            options: { min: 8 },
          },
    }
}
