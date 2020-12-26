const { register, login, userBlogs, createBlog } = require("./userController");

const { blogs } = require("./blogController");
const { verifyEmail, reSendEmail } = require("./emailController");

module.exports = {
  register,
  login,
  userBlogs,
  createBlog,
  blogs,
  verifyEmail,
  reSendEmail,
};
