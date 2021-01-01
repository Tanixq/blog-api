const { isEmpty } = require("lodash")
const {
  VERIFY_MESSAGE,
  VERIFY_STATUS,
  TYPE_LOG,
  SIGNUP,
} = require("../common/helpers/constant")
const logger = require('../common/helpers/logger')
const { STATUS_CODE } = require("../common/helpers/response-code")
const { Response, systemError } = require("../common/response-formatter")
const { User } = require("../../db/models")
const otpGenerator = require("otp-generator")
const { sendEmail } =require("../common/helpers/email")
const bcrypt = require('bcrypt')

const VALID_TIME = 5 * 60 * 1000 // 5 mins

/**
 * 
 * @param {*} inOtp: Input value for pin code
 * 
 */

const checkVaildPasscode = (inOtp, user) => {
    let response = Response(STATUS_CODE.NOT_FOUND, VERIFY_MESSAGE.EMAIL_NOT_FOUND, '')
    if (isEmpty(user) || !user) {
        return response
    }
    const { code, expired_at } = user
    if ((inOtp === code)) {
        if (Date.now() - expired_at > VALID_TIME) {
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

/**
 * Handling user's OTP code
 */
const handlePinCode = async (email, otp, valueUpdate) => {
  logger.debug(TYPE_LOG.USER, 'Handling pin code for user: ', { email: `${email}` })
  let response = Response(STATUS_CODE.NOT_FOUND, SIGNUP.USER_NOT_EXIST, '')
  try {
      const existedUser = await User.findOne({ email: `${email}` })
      if (!isEmpty(existedUser)) {
            response = checkVaildPasscode(otp, existedUser)
            if (response.statusCode === STATUS_CODE.SUCCESS) {
                await User.findOneAndUpdate({ email: `${email.toLocaleLowerCase()}` }, valueUpdate)
            }  
      } else {
          return response
      }
  } catch (err) {
      logger.error(TYPE_LOG.USER, 'Cannot handle PIN code: ', err.stack)
      if (err.name === 'MongoError') {
          response = systemError(VERIFY_MESSAGE.EXCEPTION)
      } else {
          response.statusCode = STATUS_CODE.BLOCKCHAIN_ERROR
          // response.message = ACTION.EXCEPTION
      }
  }
  return response
}

/**
 * Verify email API handling
 * @param {*} req: in body, pass though email and pin_code
 * @param {*} res: Return error code as API's document
 */
const verifyEmail = async (req, res) => {
  const { email, otp } = req.body
  logger.debug(TYPE_LOG.USER, ' Stating verify email for user: ', { email: `${email}` })
  const response = await handlePinCode(email, otp,
      {
          email_verified: true
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

/**
 * Reset password API handling 
 */
const resetPassword = async (req, res) => {
  const {
      email,
      otp,
      new_password
  } = req.body
  logger.debug(TYPE_LOG.USER, 'Starting reset password for user: ', { email: `${email}` })
  const hash = bcrypt.hashSync(new_password, 5)
  const response = await handlePinCode(email, otp,
      {
          email_status: `${VERIFY_STATUS.VERIFIED}`,
          password: `${hash}`
      })
  res.send(response)
}

module.exports = {
  verifyEmail,
  reSendEmail,
  resetPassword
}
