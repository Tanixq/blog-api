const { Router } = require("express")
const { isAuthenticate } = require("../common/helpers/auth")
const { viewAllPublicBlogs } = require("../controllers")
const routes = Router()

const { parseBody } = require("../common/helpers/http-request")

const {
    validateCreateBlog,
    validateTokenInHeader
  } = require('../common/validators')
const { createBlog, viewUserBlogs } = require("../controllers")

routes.get("/view/", viewAllPublicBlogs)
routes.get('/user-blogs', validateTokenInHeader, isAuthenticate, viewUserBlogs )

routes.post(
  "/create-new",
  validateTokenInHeader,
  isAuthenticate,
  parseBody,
  validateCreateBlog,
  createBlog
)

module.exports = routes
