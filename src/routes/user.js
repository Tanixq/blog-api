const express = require("express");
const { register, login, userBlogs, createBlog, verifyEmail, reSendEmail } = require("../controllers");
const router = express.Router();
const {
  validateRegister,
  validateLogin,
  validateBlog,
  validateVerifyEmail,
  validateReSendEmail
} = require("../common/validators");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/create-blog", validateBlog, createBlog);
router.get("/blogs", userBlogs);
router.post('/email/verify', validateVerifyEmail, verifyEmail)
router.post('/email/resend', validateReSendEmail, reSendEmail)

module.exports = router;
