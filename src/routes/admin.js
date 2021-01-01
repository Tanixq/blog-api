const { Router } = require('express')
const { adminLogin, adminSignup, adminLogout, pendingBlogs, rejectedBlogs, approvedBlogs, approveBlogById, rejectBlogById } = require('../controllers')
const { isAdminAuthenticated } = require('../common/helpers/admin-auth')
const { validateAdminLogin, validateAdminSignup, validateApproveBlogById, validateTokenInHeader } = require('../common/validators')
const routes = Router()

routes.post('/login', validateAdminLogin, adminLogin)
routes.post('/signup', validateAdminSignup, validateTokenInHeader, isAdminAuthenticated, adminSignup)
// routes.post('/logout', validateTokenInHeader, isAdminAuthenticated, adminLogout)
routes.get('/view/pending-blogs', validateTokenInHeader, isAdminAuthenticated, pendingBlogs)
routes.get('/view/rejected-blogs', validateTokenInHeader, isAdminAuthenticated, rejectedBlogs)
routes.get('/view/approved-blogs', validateTokenInHeader, isAdminAuthenticated, approvedBlogs)
routes.post('/blog/approve', validateApproveBlogById, validateTokenInHeader, isAdminAuthenticated, approveBlogById)
routes.post('/blog/reject', validateApproveBlogById, validateTokenInHeader, isAdminAuthenticated, rejectBlogById)

module.exports = routes
