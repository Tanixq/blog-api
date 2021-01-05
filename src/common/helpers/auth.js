const jwt = require('jsonwebtoken')
const { AUTHENTICATION_TOKEN } = require('../../../config/config')
const { isEmpty } = require('lodash')
const { User } = require('../../../db/models')
const { Response } = require('../response-formatter')
const { redisClient } = require('./redisClient')
const { STATUS_CODE } = require('../helpers/response-code')
const { AUTHENTICATION } = require('../helpers/constant')

// authentication secret key for jwt 
const authenticationToken = AUTHENTICATION_TOKEN

// function to generate JWT token and set token as key in redis
const genJWTToken = async (id, expTime) => {
    const token = jwt.sign(
        {
            id: id
        },
        authenticationToken,
        { expiresIn: expTime }
    )
    redisClient.SET(token, id)
    redisClient.expire(token, expTime)
    return token
}

// function to remove jwt token from redis
const removeToken = async (token) => {
    redisClient.del(token)
}

// function to validate if user exist in redis as well as on database or not
const validateUser = async (token, id) => {
    let isExist = await redisClient.getAsync(`${token}`)
    if (isExist) {
        const isUser = await User.findOne({ _id: `${id}` })
        isExist = !isEmpty(isUser)
    }
    return isExist
}

// function to validate authorization token in header
const isAuthenticate = async (req, res, next) => {
    let response = Response(STATUS_CODE.SUCCESS, AUTHENTICATION.SUCCESS, false, '')
    try {
        if (req.headers.authorization === undefined || isEmpty(req.headers.authorization)) {
            response.statusCode = STATUS_CODE.INVALID_VALUE
            response.message = AUTHENTICATION.INVALID_TOKEN
            response.hasError = true
        } else {
            const token = req.header('Authorization').replace('Bearer', '').trim()
            if (token) {
                const decoded = jwt.verify(token, authenticationToken)
                if (decoded.exp <= (Date.now() / 1000)) {
                    response.statusCode = STATUS_CODE.EXPIRED_VALUE
                    response.message = AUTHENTICATION.TOKEN_EXPIRED
                    response.hasError = true
                } else {
                    req.body.userId = decoded.id
                    const isUser = await validateUser(`${token}`, decoded.id)
                    if (!isUser) {
                        response.statusCode = STATUS_CODE.INVALID_VALUE
                        response.message = AUTHENTICATION.INVALID_TOKEN
                        response.hasError = true
                    }
                }
            }
        }
    } catch (err) {
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
    isAuthenticate,
    genJWTToken,
    removeToken,
    validateUser
}
