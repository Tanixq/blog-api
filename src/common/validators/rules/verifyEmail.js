const register = require("./register");

module.exports = {
  email: register.email,
  otp: {
    in: ["body"],
    errorMessage: '"otp" field is missing',
    exists: true,
  },
};
