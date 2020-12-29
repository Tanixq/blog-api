const express = require("express")
const {
  register,
  login,
  userBlogs,
  createBlog,
  verifyEmail,
  reSendEmail,
} = require("../controllers")
const router = express.Router()
const {
  validateRegister,
  validateLogin,
  validateVerifyEmail,
  validateReSendEmail,
  validateHeaderToken,
  validateCreateBlog,
  validateThumbImage,
} = require("../common/validators")
const { parseBody } = require("../common/helper/http-request")

router.post("/register", validateRegister, register)
router.post("/login", validateLogin, login)
router.post(
  "/create-blog",
  validateHeaderToken,
  parseBody,
  validateCreateBlog,
  validateThumbImage,
  createBlog
)
router.get("/blogs", validateHeaderToken, userBlogs)
router.post("/email/verify", validateVerifyEmail, verifyEmail)
router.post("/email/resend", validateReSendEmail, reSendEmail)

module.exports = router
