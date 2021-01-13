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
const newComment = require('./new-comment')
const clapOnComment = require('./clap-on-comment')
const replyOnComment = require('./reply-on-comment')
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
    deleteBlog,
    newComment,
    clapOnComment,
    replyOnComment
}
