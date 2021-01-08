const { signup, reSendCode, login, logout, editUserBio, viewUserProfile } = require('./userController')
const { createBlog, viewAllPublicBlogs, viewBlogsByUser, viewUserBlogs, deleteUserBlog, viewBlogByTitle, viewBlogsByCategory } = require('./blogController')
const { verifyEmail, resetPassword } = require('./emailController')
const { 
    adminLogin,
    adminSignup,
    adminLogout,
    pendingBlogs,
    rejectedBlogs,
    approvedBlogs,
    approveBlogById,
    rejectBlogById,
    adminViewBlogById,
    adminViewBlogsByUser,
    adminViewUser } = require('./adminController')

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
    viewBlogsByCategory,
    adminViewBlogById,
    adminViewBlogsByUser,
    adminViewUser,
    viewBlogsByUser
}
