const express = require("express");
const { register, login, userBlogs, createBlog, verifyEmail, reSendEmail } = require("../controllers");
const router = express.Router();
const {
  validateRegister,
  validateLogin,
  validateBlog,
  validateVerifyEmail,
  validateReSendEmail,
  validateHeaderToken,
} = require("../common/validators");
var multer = require('multer');
var upload = multer({dest:'uploads/'});


router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/create-blog", validateHeaderToken, upload.single('thumb_image'), createBlog);
router.get("/blogs", validateHeaderToken, userBlogs);
router.post('/email/verify', validateVerifyEmail, verifyEmail)
router.post('/email/resend', validateReSendEmail, reSendEmail)

module.exports = router;
