module.exports = {
    Authorization:{
      in: ["headers"],
      errorMessage: "Authorization token is missing",
      exists: true,
    },
  }