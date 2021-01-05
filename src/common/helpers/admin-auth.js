const jwt = require('jsonwebtoken')
const { ADMIN_AUTHENTICATION_TOKEN } = require('../../../config/config')
const { Admin } = require('../../../db/models')
const { redisClient } = require('./redisClient')
const { AUTHENTICATION } = require('./constant')
const { Response } = require('../response-formatter')
const { STATUS_CODE } = require('../helpers/response-code')
const { isEmpty } = require('lodash')

// admin authentication secret key for jwt 
const adminAuthenticationToken = ADMIN_AUTHENTICATION_TOKEN

// function to generate admin JWT token and set token as key in redis
const genAdminJWTToken = async (admin_id, expTime) => {
    const adminToken = jwt.sign({
        admin_id: admin_id
    }, adminAuthenticationToken, { expiresIn: expTime })
    redisClient.SET(adminToken, admin_id)
    redisClient.expire(adminToken, expTime)
    return adminToken
}

// function to remove admin jwt token from redis
const removeAdminToken = async (adminToken) => {
    redisClient.DEL(adminToken)
}

// function to validate if admin exist in redis as well as on database or not
const validateAdmin = async (adminToken, admin_id) => {
    let isExist = await redisClient.getAsync(`${adminToken}`)
    if (isExist) {
        const isAdmin = await Admin.findOne({ _id: `${admin_id}` })
        isExist = !isEmpty(isAdmin)
    }
    return isExist
}

// function to validate admin authorization token in header
const isAdminAuthenticated = async (req, res, next) => {
    let response = Response(STATUS_CODE.SUCCESS, AUTHENTICATION.SUCCESS, false, '')
    try {
        if (req.headers.authorization === undefined || isEmpty(req.headers.authorization)) {
            console.log(req.headers.authorization)
            response.statusCode = STATUS_CODE.INVALID_VALUE
            response.message = AUTHENTICATION.INVALID_TOKEN
            response.hasError = true
        } else {
            const adminToken = req.header('Authorization').replace('Bearer', '').trim()
            if (adminToken) {
                const decodedAdmin = jwt.verify(adminToken, adminAuthenticationToken)
                if (decodedAdmin.exp <= (Date.now() / 1000)) {
                    response.statusCode = STATUS_CODE.EXPIRED_VALUE
                    response.message = AUTHENTICATION.TOKEN_EXPIRED
                    response.hasError = true
                } else {
                    req.body.adminId = decodedAdmin.admin_id
                    const isAdmin = await validateAdmin(`${adminToken}`, decodedAdmin.admin_id)
                    if (!isAdmin) {
                        response.statusCode = STATUS_CODE.INVALID_VALUE
                        response.message = AUTHENTICATION.INVALID_TOKEN
                        response.hasError = true
                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
        response.statusCode = STATUS_CODE.EXPIRED_VALUE
        response.message = AUTHENTICATION.TOKEN_EXPIRED
        response.hasError = true
    }

    if (response.hasError) {
        res.send(response)
    } else {
        next()
    }
}

module.exports = {
    isAdminAuthenticated,
    genAdminJWTToken,
    removeAdminToken
}
