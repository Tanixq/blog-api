module.exports = {
    Authorization:{
        in: ["headers"],
        errorMessage: 'Token is missing',
        exists: true,
      }
}