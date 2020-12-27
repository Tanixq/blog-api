const { Blog } = require("../../db/models");
const { STATUS_CODE } = require("../common/helper/response-code.js");
const { Response } = require("../common/response-formatter");
const { validateToken } = require("../common/helper/auth");
const { BLOG, TOKEN } = require("../common/helper/constant");

const blogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "Success", "");
  try {
    const blogs = await Blog.find({ approved: true });
    response.message = blogs;
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "");
    console.log(error);
  }
  res.send(response);
};

const userBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "Success", "");
  const token = req.headers.authorization;
  try {
      const decoded = validateToken(token);
      if (decoded) {
        const blogs = await Blog.find({ author: decoded.email });
        response.data = blogs;
      } else {
        response = Response(STATUS_CODE.UNAUTHORIZATION, TOKEN.FAILED, "");
      }
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "");
    console.log(error);
  }
  res.send(response);
};

const createBlog = async (req, res) => {
  let response;
  let thumb_image = req.file.path;
  const { title, description } = req.body;
  const token = req.headers.authorization;
  try {
      const decoded = validateToken(token);
      if (decoded) {
        const newBlog = new Blog({
          title,
          description,
          thumb_image: thumb_image,
          author: decoded.email,
          approved: false,
        });
        await newBlog.save();
        response = Response(STATUS_CODE.SUCCESS, BLOG.SUCCESS, "");
      } else {
        response = Response(STATUS_CODE.UNAUTHORIZATION, TOKEN.FAILED, "");
      }
  } catch (error) {
    response = Response(
      STATUS_CODE.SERVER_ERROR,
      `Not Created Successfully`,
      ""
    );
    console.log(error);
  }
  res.send(response);
};

const reviewBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "Success", "");
  const token = req.headers.authorization;
  try {
      const decoded = validateToken(token);
      if (decoded) {
        const blogs = await Blog.find({approved: false});
        response.data = blogs;
      } else {
        response = Response(STATUS_CODE.UNAUTHORIZATION, TOKEN.FAILED, "");
    }
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "");
    console.log(error);
  }
  res.send(response);
}

const approveBlog = async (req, res) => {

  let response = Response(STATUS_CODE.SUCCESS, "Success", "");
  const { blog_id } = req.body
  const token = req.headers.authorization;
  try {
      const decoded = validateToken(token);
      if (decoded) {
        await Blog.findByIdAndUpdate(blog_id, {approved: true});
      } else {
        response = Response(STATUS_CODE.UNAUTHORIZATION, TOKEN.FAILED, "");
      }
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "");
    console.log(error);
  }
  res.send(response);
}

module.exports = {
  blogs,
  userBlogs,
  createBlog,
  reviewBlogs,
  approveBlog
};
