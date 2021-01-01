const { signup, reSendCode, login, logout } = require("./userController")
const { createBlog, viewAllPublicBlogs, viewUserBlogs } = require("./blogController")
const { verifyEmail, resetPassword } = require("./emailController")
const { adminLogin, adminSignup, adminLogout, pendingBlogs, rejectedBlogs, approvedBlogs, approveBlogById, rejectBlogById } = require("./adminController")

module.exports = {
  login,
  logout,
  reSendCode,
  signup,
  verifyEmail,
  resetPassword,
  createBlog,
  viewAllPublicBlogs,
  viewUserBlogs,
  adminLogin,
  adminSignup,
  adminLogout,
  pendingBlogs,
  rejectedBlogs,
  approvedBlogs,
  approveBlogById,
  rejectBlogById
}
