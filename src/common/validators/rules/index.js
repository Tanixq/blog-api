const signup = require('./signup')
const login = require('./login')
const verifyEmail = require('./verify-email')
const reSendCode = require('./resend-code')
const adminLogin = require('./admin-login')
const adminSignup = require('./admin-signup')
const resetPassword = require('./reset-password')
const approveBlog = require('./approve-blog')
const tokenInHeader = require('./token-in-header')

module.exports = {
  reSendCode,
  signup,
  login,
  verifyEmail,
  resetPassword,
  adminLogin,
  adminSignup,
  approveBlog,
  tokenInHeader
}