const jwt = require("jsonwebtoken")
const { isEmpty } = require("lodash")
const { User } = require("../../../db/models")
const { redisClient } = require("./redisClient")

// const { decrypt } = require('./crypto')

const authenticationToken = "TEATMEi12jiTT"

const validateUser = async (token, email) => {
  let isExist = redisClient.GET(`${token}`)
  if (isExist) {
    const isUser = await User.findOne({ email: `${email}` })
    isExist = !isEmpty(isUser)
  }
  return isExist
}

const genJWTToken = async (email, expTime) => {
  const token = jwt.sign(
    {
      email: email,
    },
    authenticationToken,
    { expiresIn: expTime }
  )
  redisClient.SET(token, email)
  redisClient.expire(token, expTime)
  return token
}

const validateToken = (token) => {
  try {
    var decoded = jwt.verify(token, authenticationToken)
    if (decoded.exp <= Date.now() / 1000) {
      return false
    }
    return decoded
  } catch (err) {
    return false
  }
}

module.exports = {
  genJWTToken,
  validateUser,
  validateToken
}
