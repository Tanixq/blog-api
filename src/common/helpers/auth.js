const jwt = require("jsonwebtoken")
const { isEmpty } = require("lodash")
const { User } = require("../../../db/models")
const { Response } = require('../response-formatter')
const { redisClient } = require("./redisClient")
const { STATUS_CODE } = require('../helpers/response-code')
const { AUTHENTICATION } = require('../helpers/constant')

const authenticationToken = "TEATMEi12jiTT"

const genJWTToken = async (id, expTime) => {
  const token = jwt.sign(
    {
      id: id,
    },
    authenticationToken,
    { expiresIn: expTime }
  )
  redisClient.SET(token, id)
  redisClient.expire(token, expTime)
  return token
}

const removeToken = async (token) => {
  redisClient.DEL(token)
}

const validateUser = async (token, id) => {
  let isExist = redisClient.GET(`${token}`)
  if (isExist) {
    const isUser = await User.findOne({ _id: `${id}` })
    isExist = !isEmpty(isUser)
  }
  return isExist
}

const isAuthenticate = async (req, res, next) => {
  let response = Response(STATUS_CODE.SUCCESS, AUTHENTICATION.SUCCESS, false, '')

  try {
      const token = req.header('Authorization').replace('Bearer', '').trim()
      if (token) {
        const decoded = jwt.verify(token, authenticationToken)
        console.log(decoded);
        if (decoded.exp <= (Date.now() / 1000)) {
          response.statusCode = STATUS_CODE.EXPIRED_VALUE
          response.message = AUTHENTICATION.TOKEN_EXPIRED
          hasError = true
        } else {
          req.body.user_id = decoded.id
          const isUser = await validateUser(`${token}`, decoded.id)
          if (!isUser) {
            response.statusCode = STATUS_CODE.INVALID_VALUE
            response.message = AUTHENTICATION.INVALID_TOKEN
            hasError = true
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
