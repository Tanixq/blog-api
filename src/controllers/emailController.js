const { isEmpty } = require("lodash")
const {
  VERIFY_MESSAGE,
  SIGNUP,
} = require("../common/helper/constant")
const { STATUS_CODE } = require("../common/helper/response-code")
const { Response, systemError } = require("../common/response-formatter")
const { User } = require("../../db/models")
const otpGenerator = require("otp-generator")
const { sendEmail } =require("../common/helper/email")

const VALID_TIME = 5 * 60 * 1000 // 5 mins

const checkVaildPasscode = (otp, user) => {
  let response = Response(
    STATUS_CODE.NOT_FOUND,
    VERIFY_MESSAGE.EMAIL_NOT_FOUND,
    ""
  )
  if (isEmpty(user) || !user) {
    return response
  }
  const { code, code_expired } = user
  if (otp === code) {
    if (Date.now() - code_expired > VALID_TIME) {
      response.statusCode = STATUS_CODE.EXISTED_VALUE
      response.message = VERIFY_MESSAGE.EXPIRED_PASSCODE
    } else {
      response.statusCode = STATUS_CODE.SUCCESS
      response.message = VERIFY_MESSAGE.SUCCESS
    }
  } else {
    response.statusCode = STATUS_CODE.INVALID_VALUE
    response.message = VERIFY_MESSAGE.INVALID_PASSCODE
  }
  return response
}

const handlePinCode = async (email, otp, valueUpdate) => {
  let response = Response(STATUS_CODE.NOT_FOUND, SIGNUP.USER_NOT_EXIST, "")
  try {
    const existedUser = await User.findOne({ email: email })
    if (!isEmpty(existedUser)) {
      response = checkVaildPasscode(otp, existedUser)
      if (response.statusCode === STATUS_CODE.SUCCESS) {
        await User.findOneAndUpdate({ email: email }, valueUpdate)
      }
    } else {
      return response
    }
  } catch (err) {
    if (err.name === "MongoError") {
      response = systemError(VERIFY_MESSAGE.EXCEPTION)
    } else {
      response.statusCode = STATUS_CODE.BLOCKCHAIN_ERROR
    }
  }
  return response
}
/**
 * Verifi email API handling
 * @param {*} req: in body, pass though email and otp
 * @param {*} res: Return error code as API's document
 */
const verifyEmail = async (req, res) => {
  const { email, otp } = req.body
  const response = await handlePinCode(email, otp, {
    email_verified: true,
  })
  res.send(response)
}

const reSendEmail = async (req, res) => {
  const { email } = req.body

  let response = Response(STATUS_CODE.SUCCESS, SIGNUP.SUCCESS, "")
  try {
    const isExistedUser = await User.findOne({ email: email })
    if (isEmpty(isExistedUser) || isExistedUser === null) {
      response = (STATUS_CODE.EXISTED_VALUE, SIGNUP.USER_NOT_EXIST)
    } else if (isExistedUser.email_verified) {
      response = (STATUS_CODE.EXISTED_VALUE, VERIFY_MESSAGE.ALREADY_VERIFIED)
    } else {
      if (isExistedUser.email_verified === false) {
        const otpCode = otpGenerator.generate(6, { specialChars: false })
        await User.findOneAndUpdate(
          { email: `${email}` },
          { code: otpCode, code_expired: Date.now() }
        )
        sendEmail(
          email,
          otpCode,
          "email_verification",
          "Confirm your Platform account!"
        )
        response.message = SIGNUP.RESEND_CODE
      }
    }
  } catch (error) {
    response = systemError(SIGNUP.EXCEPTION)
    console.log(error)
  }

  res.send(response)
}

module.exports = {
  verifyEmail,
  reSendEmail,
}
