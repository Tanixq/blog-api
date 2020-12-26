const register = require("./register");
const login = require("./login");
const blog = require("./blog");
const verifyEmail = require("./verify-email")
const reSendEmail = require("./resend-email")

module.exports = {
  register,
  login,
  blog,
  verifyEmail,
  reSendEmail
};
