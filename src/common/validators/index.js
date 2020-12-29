const { checkSchema, validationResult } = require("express-validator")
const rules = require("./rules")
const { validateToken } = require("../helper/auth")
const { Response } = require("../response-formatter")
const { STATUS_CODE } = require("../helper/response-code")
const { TOKEN } = require("../helper/constant")
const { isEmpty } = require("lodash")

const validate = async (req, res, next) => {
  const errorResult = validationResult(req).array()
  if (errorResult.length > 0) {
    res.status(422).send({ errorResult })
  } else {
    next()
  }
}

const validateRegister = [checkSchema(rules.register), validate]
const validateLogin = [checkSchema(rules.login), validate]
const validateBlog = [checkSchema(rules.blog), validate]
const validateVerifyEmail = [checkSchema(rules.verifyEmail), validate]
const validateReSendEmail = [checkSchema(rules.reSendEmail), validate]
const validateApproveBlog = [checkSchema(rules.approveBlog), validate]
const validateCreateBlog = [checkSchema(rules.validateCreateBlog), validate]

const validateHeaderToken = async (req, res, next) => {
  const token = req.headers.authorization
  const response = Response(STATUS_CODE.UNAUTHORIZATION, TOKEN.FAILED, "")
  [
    checkSchema(rules.validateHeaderToken),
    validationResult(req).array().length > 0
      ? res.status(422).send(validationResult(req).array)
      : validateToken(token)
      ? next()
      : res.send(response)
  ]
}

const validateThumbImage = (req, res, next) => {
  const error = {
    errorMessage: "thumb_image is missing",
  }
  if (isEmpty(req.file)) {
    res.status(422).send(error)
  } else {
    next()
  }
}

module.exports = {
  validateRegister,
  validateLogin,
  validateBlog,
  validateVerifyEmail,
  validateReSendEmail,
  validateApproveBlog,
  validateHeaderToken,
  validateCreateBlog,
  validateThumbImage
}
