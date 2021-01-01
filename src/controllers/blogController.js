const { Blog, User } = require("../../db/models")
const { STATUS_CODE } = require("../common/helpers/response-code.js")
const { Response, systemError } = require("../common/response-formatter")
const { BLOG, LOGIN, TYPE_LOG } = require("../common/helpers/constant")
const { uploadSingleFile } = require("../common/helpers/file-upload")
const { uniqueId } = require("../common/helpers/uniqueId")
const { isEmpty } = require("lodash")
const logger = require('../common/helpers/logger')

const viewAllPublicBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "", "")
  try {
    const blogs = await Blog.find({ blog_status: 'approved' }, ['title', 'content', 'thumb_image_path', 'author', 'createdAt',])
    response.data = blogs
  } catch (err) {
    logger.error(TYPE_LOG.USER, 'User cannot View Public Blogs: ', err.stack)
    response = systemError(BLOG.EXCEPTION)
    console.log(err)
  }
  res.send(response)
}

const viewUserBlogs = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, "", "")
    const user_id = req.body.user_id
    try {
      const userBlogs = await Blog.find({'author.author_id' : `${user_id}`},  ['title', 'content', 'thumb_image_path', 'createdAt','blog_status'])
      response.data = userBlogs
    } catch (error) {
      logger.error(TYPE_LOG.USER, 'User cannot View its Blogs: ', err.stack)
      response = systemError(LOGIN.EXCEPTION)
      console.log(err)
    }
    res.send(response)
}

const createBlog = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, BLOG.CREATE_SUCCESSFUL, "")
  const { title, content } = req.body
  try {
      const isExist = await Blog.find({title: `${title.toLocaleLowerCase()}`})
      if (isEmpty(isExist)) {
      const thumb_image_path = uniqueId()
      uploadSingleFile(req.file[0], req.file[0].type, thumb_image_path)
      const user = await User.findById(req.body.user_id)
      const newBlog = new Blog({
        title: `${title.toLocaleLowerCase()}`,
        content: `${content}`,
        thumb_image_path: `${thumb_image_path}`,
        author: {
          author_id: `${user.id}`,
          author_email: `${user.email}`,
          author_name: `${user.first_name} ${user.last_name}`
        },
        blog_status: 'pending',
      })
      await newBlog.save() 
    }else{
      response.statusCode = STATUS_CODE.EXISTED_VALUE
      response.message = BLOG.BLOG_EXISTED
    }
  } catch (err) {
    logger.error(TYPE_LOG.USER, 'User cannot login: ', err.stack)
    response = systemError(LOGIN.EXCEPTION)
    console.log(err)
  }
  res.send(response)
}


module.exports = {
  viewAllPublicBlogs,
  viewUserBlogs,
  createBlog,
}
