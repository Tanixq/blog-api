module.exports = {
    title:{
      in: ["body"],
      errorMessage: "title is missing",
      exists: true,
    },
    description: {
      in: ["body"],
      errorMessage: "description is missing",
      exists: true,
    },
  }