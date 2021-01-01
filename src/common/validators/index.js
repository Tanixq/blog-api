const { checkSchema, validationResult } = require("express-validator")
const rules = require("./rules")
const { validateCreateBlog } = require('./custom-validators')

const validate = async (req, res, next) => {
  const errorResult = validationResult(req).array()
  if (errorResult.length > 0) {
    res.status(422).send({ errorResult })
  } else {
    next()
  }
}

const validateLogin = [checkSchema(rules.login), validate]
const validateReSendCode = [checkSchema(rules.reSendCode), validate]
const validateSignup = [checkSchema(rules.signup), validate]
const validateVerifyEmail = [checkSchema(rules.verifyEmail), validate]
const validateResetPass = [checkSchema(rules.resetPassword), validate]
const validateAdminLogin = [checkSchema(rules.adminLogin), validate]
const validateAdminSignup = [checkSchema(rules.adminSignup), validate]
const validateApproveBlogById = [checkSchema(rules.approveBlog), validate]
const validateTokenInHeader = [checkSchema(rules.tokenInHeader), validate]


module.exports = {
  validateLogin,
  validateReSendCode,
  validateSignup,
  validateVerifyEmail,
  validateResetPass,
  validateCreateBlog,
  validateAdminLogin,
  validateAdminSignup,
  validateApproveBlogById,
  validateTokenInHeader
}
