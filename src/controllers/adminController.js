const { Admin, Blog } = require("../../db/models")
const { isEmpty } = require("lodash")
const { STATUS_CODE } = require("../common/helpers/response-code.js")
const { Response ,systemError } = require("../common/response-formatter")
const { ADMIN, TYPE_LOG, BLOG, LOGIN } = require("../common/helpers/constant")
const bcrypt = require("bcrypt")
const { genAdminJWTToken, removeAdminToken } = require('../common/helpers/admin-auth')
const logger = require('../common/helpers/logger')

const adminLogin = async (req, res) => {
  const { admin_username, admin_password } = req.body
  let response = Response(STATUS_CODE.SUCCESS, ADMIN.LOGIN_SUCCESS, "")
  try {
    const existedAdmin = await Admin.findOne({ admin_username: admin_username })
    if (isEmpty(existedAdmin)) {
      response.statusCode = STATUS_CODE.NOT_FOUND
      response.message = ADMIN.INVALID_CREDENTIAL
    } else if (bcrypt.compareSync(admin_password, existedAdmin.admin_password) === false) {
      response.statusCode = STATUS_CODE.INVALID_VALUE
      response.message = ADMIN.INVALID_CREDENTIAL
    } else {
      const adminToken = await genAdminJWTToken(`${existedAdmin.id}`, 1800)
      let adminInfo = {
        admin_id: existedAdmin.id,
      }
      response.data = {
        admin: adminInfo,
        adminToken: adminToken,
      }
    }
  } catch (err) {
    logger.error(TYPE_LOG.USER, 'Exeption, Admin cannot Login: ', err.stack)
    response = systemError(ADMIN.EXCEPTION)
    console.log(err)
  }
  res.send(response)
}

const adminSignup = async (req, res) => {
  const {new_admin_username, new_admin_password} = req.body
  let response = Response(STATUS_CODE.SUCCESS, ADMIN.SIGNUP_SUCCESS, '')
  try {
    const existedAdmin = await Admin.findOne({ admin_username: `${new_admin_username}` })
    if (isEmpty(existedAdmin)) {
      const newAdminData = new Admin({
        admin_username: `${new_admin_username}`,
        admin_password: `${new_admin_password}`,
      })
      await newAdminData.save()
    }else {
      response.statusCode = STATUS_CODE.EXISTED_VALUE
      response.message = ADMIN.USERNAME_EXISTED
    }

  } catch (err) {
    logger.error(TYPE_LOG.USER, 'Exeption, Admin cannot signup: ', err.stack)
    response = systemError(ADMIN.EXCEPTION)
    console.log(err);
  }
  res.send(response)
}

const adminLogout = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, ADMIN.LOGOUT_SUCCESS, '')
  const adminToken = req.header('Authorization').replace('Bearer', '').trim()
  try {
      await removeAdminToken(adminToken)
  } catch (err) {
    console.log(err);
      logger.error(TYPE_LOG.USER, 'Admin cannot logout: ', err.stack)
      response = systemError(ADMIN.EXCEPTION)
  }
  res.send(response)
}

const pendingBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "", "")
  try {
    const pendingBlogs = await Blog.find({blog_status: 'pending'},  ['title', 'content', 'thumb_image_path', 'createdAt','author'])
    response.data = pendingBlogs
  } catch (err) {
    logger.error(TYPE_LOG.USER, 'Admin cannot View pending Blogs: ', err.stack)
    response = systemError(LOGIN.EXCEPTION)
    console.log(err)
  }
  res.send(response)
}

const rejectedBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "", "")
  try {
    const rejectedBlogs = await Blog.find({blog_status: 'rejected'},  ['title', 'content', 'thumb_image_path', 'createdAt','author'])
    response.data = rejectedBlogs
  } catch (err) {
    logger.error(TYPE_LOG.USER, 'Admin cannot View rejected Blogs: ', err.stack)
    response = systemError(LOGIN.EXCEPTION)
    console.log(err)
  }
  res.send(response)
}

const approvedBlogs = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, "", "")
  try {
    const approvedBlogs = await Blog.find({blog_status: 'approved'},  ['title', 'content', 'thumb_image_path', 'createdAt','author'])
    response.data = approvedBlogs
  } catch (err) {
    logger.error(TYPE_LOG.USER, 'Admin cannot View approved Blogs: ', err.stack)
    response = systemError(LOGIN.EXCEPTION)
    console.log(err)
  }
  res.send(response)
}

const approveBlogById = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, BLOG.APPROVED_SUCCESSFUL, "")
  const { blog_id } = req.body
  try {
   await Blog.findByIdAndUpdate(blog_id, { blog_status: "approved" })
  } catch (err) {
    response.statusCode = STATUS_CODE.INVALID_VALUE
    response.message = BLOG.BLOG_NOT_EXISTED
  }
  res.send(response)
}

const rejectBlogById = async (req, res) => {
  let response = Response(STATUS_CODE.SUCCESS, BLOG.REJECTED_SUCCESSFUL, "")
  const { blog_id } = req.body
  try {
    await Blog.findByIdAndUpdate(blog_id, { blog_status: "rejected" })
  } catch (err) {
    response.statusCode = STATUS_CODE.INVALID_VALUE
    response.message = BLOG.BLOG_NOT_EXISTED
  }
  res.send(response)
}
module.exports = {
  adminLogin,
  adminSignup,
  adminLogout,
  pendingBlogs,
  rejectedBlogs,
  approvedBlogs,
  approveBlogById,
  rejectBlogById
}
