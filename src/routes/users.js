const { Router } = require("express")

const { isAuthenticate } = require('../common/helpers/auth')

const {
  login,
  logout,
  reSendCode,
  signup,
  verifyEmail,
  resetPassword
} = require('../controllers')

const {
  validateLogin,
  validateReSendCode,
  validateSignup,
  validateVerifyEmail,
  validateResetPass,
  validateTokenInHeader
} = require('../common/validators')

const routes = Router()

routes.post("/login", validateLogin, login)
// routes.post('/logout', validateTokenInHeader, isAuthenticate, logout)
routes.post("/signup", validateSignup, signup)
routes.post('/email/verify', validateVerifyEmail, verifyEmail)
routes.post('/email/resend', validateReSendCode, reSendCode)
routes.post('/password/reset', validateResetPass, resetPassword)

module.exports = routes
