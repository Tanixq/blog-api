const { Router } = require('express')

const {
    login,
    logout,
    reSendCode,
    signup,
    verifyEmail,
    resetPassword,
    editUserBio,
    viewUserProfile
} = require('../controllers')

const { parseBody } = require('../common/helpers/http-request')

const {
    validateLogin,
    validateReSendCode,
    validateSignup,
    validateVerifyEmail,
    validateResetPass,
    validateEditUserBio
} = require('../common/validators')
const { isAuthenticate } = require('../common/helpers/auth')

const routes = Router()

routes.post('/signup', parseBody, validateSignup, signup)
routes.post('/login', validateLogin, login)
routes.post('/logout', isAuthenticate, logout)
routes.post('/email/verify', validateVerifyEmail, verifyEmail)
routes.post('/email/resend', validateReSendCode, reSendCode)
routes.post('/password/reset', validateResetPass, resetPassword)
routes.post('/profile/edit/bio', validateEditUserBio, isAuthenticate, editUserBio)

routes.get('/profile', isAuthenticate, viewUserProfile)

module.exports = routes
