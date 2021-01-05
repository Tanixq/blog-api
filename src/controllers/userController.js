const { User } = require('../../db/models')
const _ = require('lodash')
const otpGenerator = require('otp-generator')
const logger = require('../common/helpers/logger')
const { STATUS_CODE } = require('../common/helpers/response-code.js')
const { Response, systemError } = require('../common/response-formatter')
const { SIGNUP, LOGIN, LOGOUT, TYPE_LOG, PROFILE } = require('../common/helpers/constant')
const bcrypt = require('bcrypt')
const { genJWTToken, removeToken } = require('../common/helpers/auth')
const { sendEmail } = require('../common/helpers/email')
const { uploadSingleFile } = require('../common/helpers/file-upload')
const { uniqueIdProfilePic } = require('../common/helpers/uniqueId')

const USER_TOKEN_EXPIRED = 1800 // expires in seconds

/**
 * User signup API
 * @param {*} req: in body, pass through (email, first_name, last_name, password, bio)
 * @param {*} res: if signup is successful, return success message
 *                 otherwise return error code as API's document
 */

const signup = async (req, res) => {
    const { firstName, lastName, email, password, bio } = req.body

    let isSendEmail = false

    let response = Response(STATUS_CODE.SUCCESS, SIGNUP.SUCCESS, '')
    const otpCode = otpGenerator.generate(6, {
        specialChars: false,
        alphabets: false,
        upperCase: false
    })
    try {
        const existedUser = await User.findOne({ email: `${email}` })
        if (_.isEmpty(existedUser)) {
            let profilePicturePath = null
            if (!_.isEmpty(req.file[0])) {
                profilePicturePath = uniqueIdProfilePic(firstName)
                uploadSingleFile(req.file[0], req.file[0].type, profilePicturePath)
            }
            const newUserData = new User({
                first_name: `${firstName._.lowerCase()}`,
                last_name: `${lastName._.lowerCase()}`,
                email: `${email.toLocaleLowerCase()}`,
                email_verified: false,
                password: `${password}`,
                bio: `${bio}`,
                code: otpCode,
                expired_at: Date.now(),
                profile_picture_path: profilePicturePath
            })
            await newUserData.save()
            isSendEmail = true
        } else if (existedUser.email_verified === false) {
            await User.findOneAndUpdate(
                { email: email },
                {
                    code: otpCode,
                    expired_at: Date.now()
                }
            )
            isSendEmail = true
            response.statusCode = STATUS_CODE.EXISTED_VALUE
            response.message = `${SIGNUP.UNVERIFIED_MAIL}`
        } else {
            response.statusCode = STATUS_CODE.EXISTED_VALUE
            response.message = `${SIGNUP.EMAIL_EXIST}`
        }

        if (isSendEmail) {
            sendEmail(
                email.toLocaleLowerCase(),
                otpCode,
                'email_verification',
                'Confirm your Platform account!'
            )
        }
    } catch (error) {
        logger.error(TYPE_LOG.USER, 'Exeption, user cannot signup: ', error.stack)
        response = systemError(SIGNUP.EXCEPTION)
    }
    res.send(response)
}

/**
 * Resend a `passcode` for verify account
 * @param {*} req: in body, pass through (email, first_name, last_name)
 * @param {*} res: Return error code as API's document
 */

const reSendCode = async (req, res) => {
    const otpCode = otpGenerator.generate(6, { specialChars: false, alphabets: false, upperCase: false })

    const {
        email
    } = req.body

    let response = Response(STATUS_CODE.SUCCESS, SIGNUP.RESEND_CODE, { email: `${email}` })
    try {
        const existedUser = await User.findOne({ email: `${email.toLocaleLowerCase()}` })
        if (!_.isEmpty(existedUser)) {
            await User.findOneAndUpdate({ email: `${email.toLocaleLowerCase()}` }, { code: otpCode, expired_at: Date.now() })
            if (existedUser.email_verified) {
                response.message = SIGNUP.RESET_PWD
                sendEmail(email.toLocaleLowerCase(), otpCode, 'reset_password', 'Reset your Platform password!')
            } else {
                sendEmail(email.toLocaleLowerCase(), otpCode, 'email_verification', 'Confirm your Platform account!')
            }
        } else {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = SIGNUP.USER_NOT_EXIST
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, ' Cannot resend PIN code for user: ', err.stack)
        response = systemError(SIGNUP.EXCEPTION)
    }
    res.send(response)
}

/**
 * User login API
 * @param {*} req: in body, pass email value
 * @param {*} res: if login is successful, return user's info and token
 *                 otherwise return error code as API's document
 */

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body
    let response = Response(STATUS_CODE.SUCCESS, LOGIN.SUCCESS, '')
    try {
        const existedUser = await User.findOne({ email: `${email}` })
        if (_.isEmpty(existedUser)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = LOGIN.INVALID_EMAIL
        } else if (existedUser.email_verified === false) {
            response.statusCode = STATUS_CODE.UNVERIFIED_EMAIL
            response.message = LOGIN.UNVERIFIED_MAIL
        } else {     
            const isMatched = bcrypt.compareSync(password, existedUser.password)
            console.log(isMatched)
            if (isMatched === false) {
                response.statusCode = STATUS_CODE.INVALID_VALUE
                response.message = LOGIN.WRONG_PASS_EMAIL
            } else {
                const token = await genJWTToken(`${existedUser.id}`, USER_TOKEN_EXPIRED)
                let userInfo = {
                    id: existedUser._id,
                    email: existedUser.email,
                    userIp: ((req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress)
                }
                response.data = {
                    user: userInfo,
                    token: token
                }
            }
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot login: ', err.stack)
        response = systemError(LOGIN.EXCEPTION)
    }
    res.send(response)
}

/**
 * User logout API
 * @param {*} req: in header, pass authorization token
 * @param {*} res: if logout is successful, return success message
 *                 otherwise return error code as API's document
 */

const logout = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, LOGOUT.SUCCESS, '')
    const token = req.header('Authorization').replace('Bearer', '').trim()
    try {
        await removeToken(token)
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot logout: ', err.stack)
        response = systemError(LOGOUT.EXCEPTION)
    }
    res.send(response)
}

/**
 * User editBio API
 * @param {*} req: in body, pass through (userId , bio)
 * @param {*} res: if edit bio is successful, return success message
 *                 otherwise return error code as API's document
 */

const editUserBio = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, SIGNUP.EDIT_BIO_SUCCESS, '')
    try {
        let { userId, bio } = req.body
        await User.findByIdAndUpdate(userId, { bio: `${bio}` })
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot update bio: ', err.stack)
        response.statusCode = STATUS_CODE.NOT_FOUND
        response.message = SIGNUP.USER_NOT_EXIST
    }
    res.send(response)
}

/**
 * Get User profile API
 * @param {*} req: in body, pass through userId
 * @param {*} res: if user exist, return user profile
 *                 otherwise return error code as API's document
 */

const viewUserProfile = async (req, res) => {
    let response = Response(STATUS_CODE.SUCCESS, PROFILE.FETCH_SUCCESS, '')
    try {
        const { userId } = req.body
        const isExist = await User.findById(userId, ['bookmarked_blogs', 'first_name', 'last_name', 'email', 'bio'])
        if (_.isEmpty(isExist)) {
            response.statusCode = STATUS_CODE.NOT_FOUND
            response.message = SIGNUP.USER_NOT_EXIST
        } else {
            response.data = isExist
        }
    } catch (err) {
        logger.error(TYPE_LOG.USER, 'User cannot update bio: ', err.stack)
        response.statusCode = STATUS_CODE.NOT_FOUND
        response.message = SIGNUP.USER_NOT_EXIST
    }
    res.send(response)
}

module.exports = {
    login,
    logout,
    reSendCode,
    signup,
    editUserBio,
    viewUserProfile
}
