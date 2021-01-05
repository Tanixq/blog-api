const { Blog, User } = require('../../db/models')
const { STATUS_CODE } = require('../common/helpers/response-code.js')
const { Response, systemError } = require('../common/response-formatter')
const { BLOG, LOGIN, TYPE_LOG } = require('../common/helpers/constant')
const { uploadSingleFile } = require('../common/helpers/file-upload')
const { uniqueIdBlogThumb } = require('../common/helpers/uniqueId')
const { isEmpty, lowerCase } = require('lodash')
const logger = require('../common/helpers/logger')

/**
 * Get public blogs API
 * @param {*} res: if blog fetched successfully, return approved blogs
 *                 otherwise return error code as API's document
 */

const viewAllPublicBlogs = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    try {
        const blogs = await Blog.find({ blog_status: 'approved' }, ['title', 'content', 'thumb_image_path', 'author.author_id', 'author.author_name', 'author.author_profile_picture_path', 'createdAt', 'category'])
        response.data = blogs
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot View Public Blogs: ', err.stack)
        response = systemError(BLOG.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Get User blogs API
 * @param {*} req: in body, pass through userId
 * @param {*} res: if blog fetched successfully, return user blogs
 *                 otherwise return error code as API's document
 */

const viewUserBlogs = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    const userId = req.body.userId
    try {
        const userBlogs = await Blog.find({ 'author.author_id': `${userId}` }, ['title', 'content', 'thumb_image_path', 'createdAt', 'blog_status', 'category'])
        response.data = userBlogs
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot View its Blogs: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Create new blog API
 * @param {*} req: in body, pass through (title, content, category)
 * @param {*} res: if blog created successfully, return success message
 *                 otherwise return error code as API's document
 */

const createBlog = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.CREATE_SUCCESSFUL, '')
    const { title, content, category } = req.body
    try {
        const isExist = await Blog.find({ title: `${lowerCase(title)}` })
        if (isEmpty(isExist)) {
            const thumbImagePath = uniqueIdBlogThumb()
            uploadSingleFile(req.file[0], req.file[0].type, thumbImagePath)
            const user = await User.findById(req.body.userId)
            let newBlog = new Blog({
                title: `${lowerCase(title)}`,
                content: `${content}`,
                thumb_image_path: `${thumbImagePath}`,
                author: {
                    author_id: `${user.id}`,
                    author_email: `${user.email}`,
                    author_name: `${user.first_name} ${user.last_name}`,
                    author_profile_picture_path: `${user.profile_picture_path}`
                },
                blog_status: 'pending'
            })
            if (!isEmpty(category)) {
                newBlog.category = lowerCase(category)
            }
            await newBlog.save() 
        } else {
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

/**
 * Create new blog API
 * @param {*} req: in body, pass through (blogId, userId)
 * @param {*} res: if blog deleted successfully, return success message
 *                 otherwise return error code as API's document
 */

const deleteUserBlog = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.DELETED_SUCCESSFUL, '')
    const { blogId, userId } = req.body
    try {
        const isBlog = await Blog.findById(blogId, ['author.author_id'])
        if (isEmpty(isBlog)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = BLOG.BLOG_NOT_EXISTED
        } else {
            let authorId = isBlog.author.author_id
            if (authorId === userId) {
                await Blog.deleteOne({ _id: blogId })
            } else {
                response.statusCode = STATUS_CODE.NOT_FOUND
                response.message = BLOG.BLOG_NOT_EXISTED
            }
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot delete blog: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Get blog by title API
 * @param {*} req: in params, pass through blogTitle
 * @param {*} res: if blog found, return blog
 *                 otherwise return error code as API's document
 */

const viewBlogByTitle = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    try {
        let requestedBlogTitle = lowerCase(req.params.blogTitle)
        const isBlogExist = await Blog.findOne({ $and: [{ title: `${requestedBlogTitle}` }, { blog_status: 'approved' }] }, ['title', 'content', 'thumb_image_path', 'author.author_id', 'author.author_name', 'author.author_profile_picture_path', 'createdAt', 'category'])
        if (isEmpty(isBlogExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = BLOG.TITLE_NOT_FOUND
        } else {
            response.data = isBlogExist
        } 
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot view blog by id: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

/**
 * Get blog by title API
 * @param {*} req: in params, pass through categoryName
 * @param {*} res: if category found, return blogs of that category
 *                 otherwise return error code as API's document
 */

const viewBlogsByCategory = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    try {
        const { categoryName } = req.params
        const isCategoryExist = await Blog.find({ $and: [{ category: `${lowerCase(categoryName)}` }, { blog_status: 'approved' }] }, ['title', 'content', 'thumb_image_path', 'author.author_id', 'author.author_name', 'author.author_profile_picture_path', 'createdAt', 'category'])
        if (isEmpty(isCategoryExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = BLOG.CATEGORY_NOT_EXISTED
        } else {
            response.data = isCategoryExist
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot view blog by Category: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
        console.log(err)
    }
    res.send(response)
}

module.exports = {
    viewAllPublicBlogs,
    viewUserBlogs,
    createBlog,
    deleteUserBlog,
    viewBlogByTitle,
    viewBlogsByCategory
}
