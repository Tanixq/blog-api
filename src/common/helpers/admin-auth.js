const jwt = require('jsonwebtoken')
const { Admin } = require('../../../db/models')
const { redisClient } = require('./redisClient')
const { ADMIN, AUTHENTICATION } = require('./constant')
const { Response } = require('../response-formatter')
const { STATUS_CODE } = require('../helpers/response-code')
const { isEmpty } = require('lodash')

const adminAuthenticationToken = "AdjiTOODKfl454%asd7"

const genAdminJWTToken = async (admin_id, expTime) => {
    const adminToken = jwt.sign({
        admin_id: admin_id
    },
        adminAuthenticationToken,
        { expiresIn: expTime })
    redisClient.SET(adminToken, admin_id)
    redisClient.expire(adminToken, expTime)
    return adminToken
}

const removeAdminToken = async (adminToken) => {
    redisClient.DEL(adminToken)
}

const validateAdmin = async (adminToken, admin_id) => {
    let isExist = redisClient.GET(`${adminToken}`)
    if (isExist) {
        const isAdmin = await Admin.findOne({ _id: `${admin_id}` })
        isExist = !isEmpty(isAdmin)
    }
    return isExist
}

const isAdminAuthenticated = async (req, res, next) => {
    let response = Response(STATUS_CODE.SUCCESS, AUTHENTICATION.SUCCESS, false, '')
    try {
        const adminToken = req.header('Authorization').replace('Bearer', '').trim()
        if (adminToken) {
            const decodedAdmin = jwt.verify(adminToken, adminAuthenticationToken)
            if (decodedAdmin.exp <= (Date.now() / 1000)) {
                response.statusCode = STATUS_CODE.EXPIRED_VALUE
                response.message = AUTHENTICATION.TOKEN_EXPIRED
                response.hasError = true
            } else {
                req.body.admin_id = decodedAdmin.admin_id
                const isAdmin = await validateAdmin(`${adminToken}`, decodedAdmin.admin_id)
                if (!isAdmin) {
                    response.statusCode = STATUS_CODE.INVALID_VALUE
                    response.message = AUTHENTICATION.INVALID_TOKEN
                    response.hasError = true
                }
            }
        }
    } catch (err) {
        console.log(err);
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