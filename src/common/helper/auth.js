const jwt = require("jsonwebtoken");
const { isEmpty } = require("lodash");
const { Response } = require("../response-formatter");
const { STATUS_CODE } = require("../helper/response-code");
const { AUTHENTICATION } = require("../helper/constant");
const { User } = require("../../../db/models");
const { redisClient } = require("./redisClient");
// const { decrypt } = require('./crypto')

const authenticationToken = "TEATMEi12jiTT";

const validateUser = async (token, email) => {
  let isExist = await redisClient.getAsync(`${token}`);

  if (isExist) {
    const isUser = await User.findOne({ email: `${email}` });
    isExist = !isEmpty(isUser);
  }
  return isExist;
};

const genJWTToken = async (email, expTime) => {
  const token = jwt.sign(
    {
      email: email,
    },
    authenticationToken,
    { expiresIn: expTime }
  );
  return token;
};

const isAuthenticate = async (req, res, next) => {
  let response = Response(
    STATUS_CODE.SUCCESS,
    AUTHENTICATION.SUCCESS,
    false,
    ""
  );

  try {
    const token = req.header("Authorization").replace("Bearer", "").trim();
    if (token) {
      const decoded = jwt.verify(token, authenticationToken);
      if (decoded.exp <= Date.now() / 1000) {
        response.statusCode = STATUS_CODE.EXPIRED_VALUE;
        response.message = AUTHENTICATION.TOKEN_EXPIRED;
      } else {
        req.body.email = decoded.email;
        const isUser = await validateUser(`${token}`, decoded.email);
        if (!isUser) {
          response.statusCode = STATUS_CODE.INVALID_VALUE;
          response.message = AUTHENTICATION.INVALID_TOKEN;
        }
      }
    }
  } catch (err) {
    response.statusCode = STATUS_CODE.SERVER_ERROR;
    response.message = AUTHENTICATION.TOKEN_NOT_FOUND;
    response.hasError = true;
  }

  if (response.hasError) {
    res.send(response);
  } else {
    next();
  }
};

const validateToken = (token) => {
  try {
    var decoded = jwt.verify(token, authenticationToken);
    if (decoded.exp <= Date.now() / 1000) {
      return false;
    }
    return decoded;
  } catch (err) {
    return false;
  }
};

module.exports = {
  genJWTToken,
  isAuthenticate,
  validateUser,
  validateToken,
};
