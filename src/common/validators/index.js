const { checkSchema, header, validationResult } = require("express-validator");
const rules = require("./rules");
const fs = require("fs")

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
// const validateBlog = [checkSchema(rules.blog), validate];
const validateVerifyEmail = [checkSchema(rules.verifyEmail), validate];
const validateReSendEmail = [checkSchema(rules.reSendEmail), validate];

const validateBlog = (req, res, next) => {
  if (req.file === null || req.file === undefined ) {
    const error = {
      msg: "thumb_image is missing"
    }
    res.send(error)
  }
  if (req.body.title === undefined || req.body.title === null ) {
    const error = {
      msg: "title is missing",
      err: ""
    }
      fs.unlink(req.file.path, (err) => {
        console.log('path/file.txt was deleted');
        if (err) {
          error.err = err
        }
      });
    res.send(error)
  }
  if (req.body.description === undefined || req.body.description === null ) {
    const error = {
      msg: "Description is missing"
    }
    
      fs.unlink(req.file.path, (err) => {
        console.log('path/file.txt was deleted');
        if (err) {
          error.err = err
        }
      });
  
    res.send(error)
  }
}

module.exports = {
  validateRegister,
  validateLogin,
  validateBlog,
  validateVerifyEmail,
  validateReSendEmail
};
