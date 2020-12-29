const { register, login } = require("./userController")
const { blogs, userBlogs, createBlog, approveBlog, reviewBlogs } = require("./blogController")
const { verifyEmail, reSendEmail } = require("./emailController")
const { adminLogin } = require("./adminController")

module.exports = {
  register,
  login,
  userBlogs,
  createBlog,
  blogs,
  verifyEmail,
  reSendEmail,
  adminLogin,
  reviewBlogs,
  approveBlog
}
