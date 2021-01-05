const { Admin, Blog } = require('../../db/models')
const { isEmpty } = require('lodash')
const { STATUS_CODE } = require('../common/helpers/response-code.js')
const { Response, systemError } = require('../common/response-formatter')
const { ADMIN, TYPE_LOG, BLOG, LOGIN } = require('../common/helpers/constant')
const bcrypt = require('bcrypt')
const { genAdminJWTToken, removeAdminToken } = require('../common/helpers/admin-auth')
const logger = require('../common/helpers/logger')

/**
 * Admin login API
 * @param {*} req: in body, pass through ( adminUsername, adminPassword)
 * @param {*} res: if login is successful, return success message and token
 *                 otherwise return error code as API's document
 */

const adminLogin = async (req, res) => {
    const { adminUsername, adminPassword } = req.body
    let response = Response(STATUS_CODE.SUCCESS, ADMIN.LOGIN_SUCCESS, '')
    try {
        const existedAdmin = await Admin.findOne({ admin_username: adminUsername })
        if (isEmpty(existedAdmin)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = ADMIN.INVALID_CREDENTIAL
        } else if (bcrypt.compareSync(adminPassword, existedAdmin.admin_password) === false) {
            response.statusCode = STATUS_CODE.INVALID_VALUE
            response.message = ADMIN.INVALID_CREDENTIAL
        } else {
            const adminToken = await genAdminJWTToken(`${existedAdmin.id}`, 1800)
            let adminInfo = {
                adminId: existedAdmin.id }
            response.data = {
                admin: adminInfo,
                adminToken: adminToken
            }
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'Exeption, Admin cannot Login: ', err.stack)
        response = systemError(ADMIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Admin signup API
 * @param {*} req: in body, pass through (newAdminUsername, newAdminPassword)
 * @param {*} res: if signup is successful, return success message
 *                 otherwise return error code as API's document
 */

const adminSignup = async (req, res) => {
    const { newAdminUsername, newAdminPassword } = req.body
    let response = Response(STATUS_CODE.SUCCESS, ADMIN.SIGNUP_SUCCESS, '')
    try {
        const existedAdmin = await Admin.findOne({ admin_username: `${newAdminUsername}` })
        if (isEmpty(existedAdmin)) {
            const newAdminData = new Admin({
                adminUsername: `${newAdminUsername}`,
                admin_password: `${newAdminPassword}`
            })
            await newAdminData.save()
        } else {
            response.statusCode = STATUS_CODE.EXISTED_VALUE
            response.message = ADMIN.USERNAME_EXISTED
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'Exeption, Admin cannot signup: ', err.stack)
        response = systemError(ADMIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Admin logout API
 * @param {*} req: in header, pass through authorization token
 * @param {*} res: if logout is successful, return success message
 *                 otherwise return error code as API's document
 */

const adminLogout = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, ADMIN.LOGOUT_SUCCESS, '')
    const adminToken = req.header('Authorization').replace('Bearer', '').trim()
    try {
        await removeAdminToken(adminToken)
    } catch (err) {
        console.log(err)
        logger.error(TYPE_LOG.USER, 'Admin cannot logout: ', err.stack)
        response = systemError(ADMIN.EXCEPTION)
    }
    res.send(response)
}

/**
 * Get Users pending blogs API
 * @param {*} res: if blog fetched successfully, return pending blogs
 *                 otherwise return error code as API's document
 */

const pendingBlogs = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    try {
        const pendingBlogs = await Blog.find({ blog_status: 'pending' }, ['title', 'content', 'thumb_image_path', 'createdAt', 'author', 'category'])
        response.data = pendingBlogs
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'Admin cannot View pending Blogs: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Get Users rejected blogs API
 * @param {*} res: if blog fetched successfully, return rejected blogs
 *                 otherwise return error code as API's document
 */

const rejectedBlogs = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    try {
        const rejectedBlogs = await Blog.find({ blog_status: 'rejected' }, ['title', 'content', 'thumb_image_path', 'createdAt', 'author', 'category'])
        response.data = rejectedBlogs
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'Admin cannot View rejected Blogs: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Get Users approved blogs API
 * @param {*} res: if blog fetched successfully, return approved blogs
 *                 otherwise return error code as API's document
 */

const approvedBlogs = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    try {
        const approvedBlogs = await Blog.find({ blog_status: 'approved' }, ['title', 'content', 'thumb_image_path', 'createdAt', 'author', 'category'])
        response.data = approvedBlogs
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'Admin cannot View approved Blogs: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Approve users blogs API
 * @param {*} req: in body, pass through blogId
 * @param {*} res: if blog approved succesfully, return success message
 *                 otherwise return error code as API's document
 */

const approveBlogById = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.APPROVED_SUCCESSFUL, '')
    const { blog_id } = req.body
    try {
        await Blog.findByIdAndUpdate(blog_id, { blog_status: 'approved' })
    } catch (err) {
        response.statusCode = STATUS_CODE.INVALID_VALUE
        response.message = BLOG.BLOG_NOT_EXISTED
    }
    res.send(response)
}

/**
 * Reject users blogs API
 * @param {*} req: in body, pass through blogId
 * @param {*} res: if blog rejected succesfully, return success message
 *                 otherwise return error code as API's document
 */

const rejectBlogById = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.REJECTED_SUCCESSFUL, '')
    const { blog_id } = req.body
    try {
        await Blog.findByIdAndUpdate(blog_id, { blog_status: 'rejected' })
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
