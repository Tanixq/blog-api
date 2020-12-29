module.exports = {
  title: {
    in: ["body"],
    errorMessage: "Title is missing",
    exists: true,
  },
  description: {
    in: ["body"],
    errorMessage: "Description field is missing",
    exists: true,
  },
}
