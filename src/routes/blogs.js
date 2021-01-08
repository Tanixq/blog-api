const { Router } = require('express')
const { isAuthenticate } = require('../common/helpers/auth')
const { viewAllPublicBlogs } = require('../controllers')
const routes = Router()

const { parseBody } = require('../common/helpers/http-request')

const {
    validateCreateBlog, validateDeleteBlog } = require('../common/validators')
const { createBlog, viewUserBlogs, deleteUserBlog, viewBlogByTitle, viewBlogsByCategory, viewBlogsByUser } = require('../controllers')

routes.get('/view/', viewAllPublicBlogs)
routes.get('/view/category/:categoryName', viewBlogsByCategory)
routes.get('/view/user/:userId', viewBlogsByUser)
routes.get('/view/user-blogs', isAuthenticate, viewUserBlogs)
routes.get('/view/:blogTitle', viewBlogByTitle)

routes.post(
    '/create-new',
    isAuthenticate,
    parseBody,
    validateCreateBlog,
    createBlog
)

routes.delete('/delete/by-id', validateDeleteBlog, isAuthenticate, deleteUserBlog)

module.exports = routes
