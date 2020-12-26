const { Blog } = require("../../db/models");
const { STATUS_CODE } = require("../common/helper/response-code.js");
const { Response } = require("../common/response-formatter");

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

module.exports = {
  blogs,
};
