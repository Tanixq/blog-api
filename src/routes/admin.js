const express = require("express")
const { adminLogin, reviewBlogs, approveBlog } = require("../controllers")
const router = express.Router()
const {
    validateLogin,
    validateApproveBlog,
    validateHeaderToken
  } = require("../common/validators")

router.post("/login", validateLogin, adminLogin)
router.get("/review-blogs", validateHeaderToken, reviewBlogs)
router.post("/approve-blog", validateApproveBlog, validateHeaderToken, approveBlog)

module.exports = router
