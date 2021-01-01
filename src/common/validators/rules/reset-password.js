const signup = require('./signup')
const verifyEmail = require('./verify-email')
module.exports = {
    email: signup.email,
    otp: verifyEmail.otp,
    new_password: signup.password
}
