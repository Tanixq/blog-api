const { Blog, Admin } = require("../../db/models")
const { STATUS_CODE } = require("../common/helper/response-code.js")
const { Response } = require("../common/response-formatter")
const { BLOG, TOKEN } = require("../common/helper/constant")
const { uploadSingleFile } = require("../common/helper/file-upload")
const { uniqueId } = require("../common/helper/uniqueId")
const jwt_decode = require("jwt-decode")
const { isEmpty } = require("lodash")

const blogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "Success", "")
  try {
    const blogs = await Blog.find({ approved: true })
    response.message = blogs
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "")
    console.log(error)
  }
  res.send(response)
}

const userBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "Success", "")
  const token = req.headers.authorization
  try {
    const decoded = jwt_decode(token)
    const blogs = await Blog.find({ author: decoded.email })
    response.data = blogs
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "")
    console.log(error)
  }
  res.send(response)
}

const createBlog = async (req, res) => {
  let response
  const { title, description } = req.body
  const token = req.headers.authorization
  try {
    const decoded = jwt_decode(token)
    const thumb_image = uniqueId()
    uploadSingleFile(req.file[0], req.file[0].type, thumb_image)
    const newBlog = new Blog({
      title,
      description,
      thumb_image: thumb_image,
      author: decoded.email,
      approved: false,
    })

    await newBlog.save()
    response = Response(STATUS_CODE.SUCCESS, BLOG.SUCCESS, "")
  } catch (error) {
    response = Response(
      STATUS_CODE.SERVER_ERROR,
      `Not Created Successfully`,
      ""
    )
    console.log(error)
  }
  res.send(response)
}

const reviewBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "Success", "")
  const token = req.headers.authorization
  try {
    const decoded = jwt_decode(token)
    const validAdmin = await Admin.findOne({ email: decoded.email })
    if (isEmpty(validAdmin)) {
      response = Response(STATUS_CODE.UNAUTHORIZATION, "Unauthorized Admin")
    } else {
      const blogs = await Blog.find({ approved: false })
      response.data = blogs
    }
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "")
    console.log(error)
  }
  res.send(response)
}

const approveBlog = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "Success", "")
  const { blog_id } = req.body
  try {
    await Blog.findByIdAndUpdate(blog_id, { approved: true })
  } catch (error) {
    response = Response(STATUS_CODE.SERVER_ERROR, " ", "")
    console.log(error)
  }
  res.send(response)
}

module.exports = {
  blogs,
  userBlogs,
  createBlog,
  reviewBlogs,
  approveBlog,
}
