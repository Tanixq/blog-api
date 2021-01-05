const { signup, reSendCode, login, logout, editUserBio, viewUserProfile } = require('./userController')
const { createBlog, viewAllPublicBlogs, viewUserBlogs, deleteUserBlog, viewBlogByTitle, viewBlogsByCategory } = require('./blogController')
const { verifyEmail, resetPassword } = require('./emailController')
const { adminLogin, adminSignup, adminLogout, pendingBlogs, rejectedBlogs, approvedBlogs, approveBlogById, rejectBlogById } = require('./adminController')

module.exports = {
    login,
    logout,
    reSendCode,
    signup,
    verifyEmail,
    resetPassword,
    createBlog,
    viewAllPublicBlogs,
    viewUserBlogs,
    adminLogin,
    adminSignup,
    adminLogout,
    pendingBlogs,
    rejectedBlogs,
    approvedBlogs,
    approveBlogById,
    rejectBlogById,
    editUserBio,
    viewUserProfile,
    deleteUserBlog,
    viewBlogByTitle,
    viewBlogsByCategory
}
