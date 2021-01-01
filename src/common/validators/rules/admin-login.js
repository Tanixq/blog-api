const signup = require('./signup')

module.exports = {
  admin_username: {  
        in: ['body'],
        errorMessage: '"username" fleid is missing',
        exists: true,
  },
  admin_password: signup.password,
}