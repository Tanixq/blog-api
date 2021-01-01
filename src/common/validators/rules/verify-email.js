const signup = require("./signup")

module.exports = {
  email: signup.email,
  otp: {
    in: ["body"],
    errorMessage: '"otp" field is missing',
    exists: true,
  },
}
