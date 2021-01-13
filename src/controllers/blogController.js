const { Blog, User, Comment } = require('../../db/models')
const { STATUS_CODE } = require('../common/helpers/response-code.js')
const { Response, systemError } = require('../common/response-formatter')
const { BLOG, LOGIN, TYPE_LOG, SIGNUP, COMMENT, CLAP } = require('../common/helpers/constant')
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
        const blogs = await Blog.find({ blog_status: 'approved' },
            ['title', 'content', 'thumb_image_path', 'author', 'createdAt', 'category'])
            .populate('author', ['first_name', 'last_name', 'profile_picture_path'])
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
        const userBlogs = await Blog.find({ author: `${userId}` }, ['title', 'content', 'thumb_image_path', 'createdAt', 'blog_status', 'category'])
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
            const fileLocation = 'blog-thumb-images'
            const thumbImagePath = uniqueIdBlogThumb()
            uploadSingleFile(req.file[0], req.file[0].type, thumbImagePath, fileLocation)
            const user = await User.findById(req.body.userId)
            let newBlog = new Blog({
                title: `${lowerCase(title)}`,
                content: `${content}`,
                thumb_image_path: `${thumbImagePath}`,
                author: `${user.id}`
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
        logger.error(TYPE_LOG.USER, 'User cannot create blog ', err.stack)
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
        const isBlog = await Blog.findById(blogId, ['author'])
        if (isEmpty(isBlog)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = BLOG.BLOG_NOT_EXISTED
        } else {
            let authorId = isBlog.author
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
        const isBlogExist = await Blog.findOne({ $and: [{ title: `${requestedBlogTitle}` }, { blog_status: 'approved' }] }, ['title', 'content', 'thumb_image_path', 'author', 'createdAt', 'category', 'claps'])
            .populate('author', ['first_name', 'last_name', 'profile_picture_path'])
            .populate('comments', ['id', 'user_id', 'comment_text', 'claps', 'createdAt', 'updatedAt', 'reply_to'])
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
        const isCategoryExist = await Blog.find({ $and: [{ category: `${lowerCase(categoryName)}` }, { blog_status: 'approved' }] }, ['title', 'content', 'thumb_image_path', 'author', 'createdAt', 'category'])
            .populate('author', ['first_name', 'last_name', 'profile_picture_path'])
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

const viewBlogsByUser = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, BLOG.FETCH_SUCCESS, '')
    try {
        const { userId } = req.params
        const isUserExist = await Blog.find({ $and: [{ author: `${userId}` }, { blog_status: 'approved' }] },
            ['title', 'content', 'thumb_image_path', 'createdAt', 'updatedAt', 'category'])
        if (isEmpty(isUserExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = BLOG.BLOG_NOT_FOUND
        } else {
            response.data = isUserExist
        } 
    } catch (err) {
        response.statusCode = STATUS_CODE.NOT_FOUND
        response.message = SIGNUP.USER_NOT_EXIST
    }
    res.send(response)
}

const createNewComment = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, COMMENT.SUCCESS, '')
    const { userId, commentText, blogId } = req.body
    try {
        const isBlogExist = await Blog.findOne({ $and: [{ _id: `${blogId}` }, { blog_status: 'approved' }] })
        if (isEmpty(isBlogExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = BLOG.BLOG_NOT_EXISTED
        } else {
            const newComment = new Comment({
                blog_id: blogId,
                user_id: userId,
                comment_text: commentText
            })
            const savedComment = await newComment.save()
            await Blog.findByIdAndUpdate(blogId, { $push: { comments: savedComment.id } })
        }
    } catch (err) {
        console.log(err)
        response.statusCode = STATUS_CODE.NOT_FOUND
        response.message = BLOG.BLOG_NOT_EXISTED
    }
    res.send(response)
}

const clapOnBlog = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, CLAP.SUCCESS, '')
    const { userId, blogId } = req.body
    try {
        const isExist = await Blog.findById(`${blogId}`)
        if (isEmpty(isExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = BLOG.BLOG_NOT_FOUND
        } else {
            const isClapExist = await Blog.findOne({ claps: { $elemMatch: { user: userId } } })
            if (isEmpty(isClapExist)) {
                await Blog.findByIdAndUpdate(blogId, { $push: { claps: { user: userId } } })
            } else {
                await Blog.findByIdAndUpdate(blogId, { $pull: { claps: { user: userId } } })
                response.message = CLAP.REMOVED_SUCCESS
            }
        }
    } catch (err) {
        console.log(err)
        response.statusCode = STATUS_CODE.NOT_FOUND
        response.message = BLOG.BLOG_NOT_EXISTED
    }
    res.send(response)
}

const deleteComment = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, COMMENT.DELETE_SUCCESS, '')
    const { commentId, userId } = req.body
    try {
        const isCommentExist = await Comment.findById(commentId)
        if (!isEmpty(isCommentExist)) {
            // eslint-disable-next-line eqeqeq
            if (isCommentExist.user_id == userId) {
                await Comment.findByIdAndDelete(commentId)
            } else {
                response.statusCode = STATUS_CODE.NOT_FOUND
                response.message = COMMENT.NOT_EXIST
            }
        } else {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = COMMENT.NOT_EXIST
        }
    } catch (err) {
        response.statusCode = STATUS_CODE.INVALID_VALUE
        response.message = COMMENT.INVALID_ID
    }
    res.send(response)
}

const clapOnComment = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, CLAP.SUCCESS, '')
    const { userId, commentId } = req.body
    try {
        const isExist = await Comment.findById(`${commentId}`)
        if (isEmpty(isExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = COMMENT.NOT_EXIST
        } else {
            const isClapExist = await Comment.findOne({ claps: { $elemMatch: { user_id: userId } } })
            if (isEmpty(isClapExist)) {
                await Comment.findByIdAndUpdate(commentId, { $push: { claps: { user_id: userId } } })
            } else {
                await Comment.findByIdAndUpdate(commentId, { $pull: { claps: { user_id: userId } } })
                response.message = CLAP.REMOVED_SUCCESS
            }
        }
    } catch (err) {
        console.log(err)
        response.statusCode = STATUS_CODE.NOT_FOUND
        response.message = BLOG.BLOG_NOT_EXISTED
    }
    res.send(response)
}

const replyOnComment = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, COMMENT.REPLY_SUCCESS, '')
    const { userId, commentId, replyText } = req.body
    try {
        const isExist = await Comment.findById(`${commentId}`)
        if (isEmpty(isExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = COMMENT.NOT_EXIST
        } else {
            const newComment = new Comment({
                blog_id: isExist.blog_id,
                user_id: userId,
                comment_text: replyText,
                reply_to: commentId
            })
            const savedComment = await newComment.save()
            await Blog.findByIdAndUpdate(isExist.blog_id, { $push: { comments: savedComment.id } })
        }
    } catch (err) {
        console.log(err)
        response.statusCode = STATUS_CODE.NOT_FOUND
        response.message = BLOG.BLOG_NOT_EXISTED
    }
    res.send(response)
}

module.exports = {
    viewAllPublicBlogs,
    viewUserBlogs,
    createBlog,
    deleteUserBlog,
    viewBlogByTitle,
    viewBlogsByCategory,
    viewBlogsByUser,
    createNewComment,
    clapOnBlog,
    deleteComment,
    clapOnComment,
    replyOnComment
}
