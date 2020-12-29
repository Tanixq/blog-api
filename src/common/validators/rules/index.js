const register = require("./register");
const login = require("./login");
const blog = require("./blog");
const verifyEmail = require("./verifyEmail")
const reSendEmail = require("./resendEmail")
const approveBlog = require("./approveBlog")
const validateHeaderToken = require("./validateHeaderToken")
const validateCreateBlog = require("./createBlog")

module.exports = {
  register,
  login,
  blog,
  verifyEmail,
  reSendEmail,
  approveBlog,
  validateHeaderToken,
  validateCreateBlog
};