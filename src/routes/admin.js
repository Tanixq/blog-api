const { Router } = require('express')
const { 
    adminLogin,
    adminLogout,
    adminSignup, 
    pendingBlogs, 
    rejectedBlogs, 
    approvedBlogs, 
    approveBlogById, 
    rejectBlogById, 
    adminViewBlogById,
    adminViewBlogsByUser,
    adminViewUser } = require('../controllers')
const { isAdminAuthenticated } = require('../common/helpers/admin-auth')
const { validateAdminLogin, validateAdminSignup, validateApproveBlogById } = require('../common/validators')
const routes = Router()

routes.post('/login', validateAdminLogin, adminLogin)
routes.post('/signup', validateAdminSignup, isAdminAuthenticated, adminSignup)
routes.post('/logout', isAdminAuthenticated, adminLogout)
routes.post('/blog/approve', validateApproveBlogById, isAdminAuthenticated, approveBlogById)
routes.post('/blog/reject', validateApproveBlogById, isAdminAuthenticated, rejectBlogById)

routes.get('/view/pending-blogs', isAdminAuthenticated, pendingBlogs)
routes.get('/view/rejected-blogs', isAdminAuthenticated, rejectedBlogs)
routes.get('/view/approved-blogs', isAdminAuthenticated, approvedBlogs)
routes.get('/view/blog-by-id', isAdminAuthenticated, adminViewBlogById)
routes.get('/view/blogs-by-user', isAdminAuthenticated, adminViewBlogsByUser)
routes.get('/view/user-profile', isAdminAuthenticated, adminViewUser)

module.exports = routes
