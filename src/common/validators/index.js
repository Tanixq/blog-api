const { checkSchema, header, validationResult } = require("express-validator");
const rules = require("./rules");

const validate = async (req, res, next) => {
  const errorResult = validationResult(req).array();
  if (errorResult.length > 0) {
    res.status(422).send({ errorResult });
  } else {
    next();
  }
};

const validateRegister = [checkSchema(rules.register), validate];
const validateLogin = [checkSchema(rules.login), validate];
const validateBlog = [checkSchema(rules.blog), validate];
const validateVerifyEmail = [checkSchema(rules.verifyEmail), validate];
const validateReSendEmail = [checkSchema(rules.reSendEmail), validate];

module.exports = {
  validateRegister,
  validateLogin,
  validateBlog,
  validateVerifyEmail,
  validateReSendEmail
};
