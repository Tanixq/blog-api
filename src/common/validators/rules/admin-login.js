const signup = require('./signup')

module.exports = {
    adminUsername: {  
        in: ['body'],
        errorMessage: '"username" fleid is missing',
        exists: true
    },
    adminPassword: signup.password
}
