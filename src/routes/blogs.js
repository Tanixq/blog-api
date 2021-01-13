const { Router } = require('express')
const { isAuthenticate } = require('../common/helpers/auth')
const routes = Router()

const { parseBody } = require('../common/helpers/http-request')

const {
    validateCreateBlog, validateDeleteBlog, validateCreateNewComment, validateClapOnComment } = require('../common/validators')
const { createBlog, 
    viewUserBlogs, 
    deleteUserBlog, 
    viewBlogByTitle, 
    viewBlogsByCategory, 
    viewBlogsByUser, 
    createNewComment,
    clapOnBlog,
    deleteComment,
    clapOnComment,
    viewAllPublicBlogs,
    replyOnComment } = require('../controllers')

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
routes.post('/comment/new', isAuthenticate, validateCreateNewComment, createNewComment)
routes.post('/comment/reply/new', isAuthenticate, replyOnComment)
routes.post('/comment/clap', isAuthenticate, validateClapOnComment, clapOnComment)
routes.post('/clap', isAuthenticate, validateDeleteBlog, clapOnBlog)

routes.delete('/comment/delete', isAuthenticate, deleteComment)
routes.delete('/delete/by-id', validateDeleteBlog, isAuthenticate, deleteUserBlog)

module.exports = routes
