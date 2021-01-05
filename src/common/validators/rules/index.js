const signup = require('./signup')
const login = require('./login')
const verifyEmail = require('./verify-email')
const reSendCode = require('./resend-code')
const adminLogin = require('./admin-login')
const adminSignup = require('./admin-signup')
const resetPassword = require('./reset-password')
const approveBlog = require('./approve-blog')
const editUserBio = require('./edit-user-bio')
const deleteBlog = require('./delete-blog')

module.exports = {
    reSendCode,
    signup,
    login,
    verifyEmail,
    resetPassword,
    adminLogin,
    adminSignup,
    approveBlog,
    editUserBio,
    deleteBlog
}
