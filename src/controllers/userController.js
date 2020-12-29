const { User } = require("../../db/models")
const { isEmpty } = require("lodash")
const validator = require("email-validator")
const otpGenerator = require("otp-generator")
const {
  STATUS_CODE,
} = require("../common/helper/response-code.js")
const { Response, systemError } = require("../common/response-formatter")
const {
  SIGNUP,
  LOGIN,
  VERIFY_MESSAGE,
} = require("../common/helper/constant")
const bcrypt = require("bcrypt")
const {
  genJWTToken,
} = require("../common/helper/auth")
const { sendEmail } = require("../common/helper/email")

const register = async (req, res) => {
  const { name, email, password } = req.body
  const otpCode = otpGenerator.generate(6, { specialChars: false })
  let response = Response(STATUS_CODE.SUCCESS, SIGNUP.RESEND_CODE, "")
  let isSendEmail = false

  try {
    let validEmail = validator.validate(email)

    if (validEmail) {
      const isExistedUser = await User.findOne({ email: email })

      if (isEmpty(isExistedUser)) {
        let newUserData = new User({
          name: name,
          email: email,
          code: otpCode,
          email_verified: false,
          code_expired: Date.now(),
        })
        // Encrypting Password and adding it into newUserData
        newUserData.password = newUserData.encryptPassword(password)
        await User.create(newUserData)
        isSendEmail = true
      } else if (isExistedUser.email_verified === false) {
        response.message = VERIFY_MESSAGE.NOT_VERIFIED
      } else {
        response.statusCode = STATUS_CODE.EXISTED_VALUE
        response.message = `${SIGNUP.EMAIL_EXIST}`
      }
      if (isSendEmail) {
        sendEmail(
          email,
          otpCode,
          "email_verification",
          "Confirm your Platform account!"
        )
      }
    }
  } catch (error) {
    response = systemError(SIGNUP.EXCEPTION)
    console.log(error)
  }

  res.send(response)
}

const login = async (req, res) => {
  const { email, password } = req.body

  let response = Response(STATUS_CODE.SUCCESS, LOGIN.SUCCESS, "")

  try {
    const existedUser = await User.findOne({ email: email })
    if (isEmpty(existedUser)) {
      response.statusCode = STATUS_CODE.NOT_FOUND
      response.message = LOGIN.INVALID_EMAIL
      console.log("not found")
    } else if (bcrypt.compareSync(password, existedUser.password) === false) {
      response.statusCode = STATUS_CODE.INVALID_VALUE
      response.message = LOGIN.WRONG_PASS_EMAIL
      console.log("wrong credentials")
    } else if (existedUser.email_verified === false) {
      response.message = VERIFY_MESSAGE.NOT_VERIFIED
    } else {
      const token = await genJWTToken(`${email}`, 1800)
      console.log(token)
      let userInfo = {
        email: existedUser.email,
        lastVisted: Date.now(),
      }
      response.data = {
        user: userInfo,
        token: token,
      }
    }
  } catch (err) {
    console.log(err)
    response = systemError(LOGIN.EXCEPTION)
  }
  res.send(response)
}



module.exports = {
  register,
  login,
}
