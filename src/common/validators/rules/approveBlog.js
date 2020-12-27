module.exports = {
  blog_id: {
    in: ["body"],
    errorMessage: 'blog_id is missing',
    exists: true,
  },
};