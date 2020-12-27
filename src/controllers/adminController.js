const { Admin, Blog } = require("../../db/models");
const { isEmpty } = require("lodash");
const { STATUS_CODE } = require("../common/helper/response-code.js");
const { Response ,systemError } = require("../common/response-formatter");
const { LOGIN } = require("../common/helper/constant");
const bcrypt = require("bcrypt");
const { genJWTToken } = require("../common/helper/auth");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  let response = Response(STATUS_CODE.SUCCESS, LOGIN.SUCCESS, "");
  try {
    const existedUser = await Admin.findOne({ email: email });
    if (isEmpty(existedUser)) {
      response.statusCode = STATUS_CODE.NOT_FOUND;
      response.message = LOGIN.INVALID_EMAIL;
      console.log("not found");
    } else if (bcrypt.compareSync(password, existedUser.password) === false) {
      response.statusCode = STATUS_CODE.INVALID_VALUE;
      response.message = LOGIN.WRONG_PASS_EMAIL;
      console.log("wrong credentials");
    } else {
      const token = await genJWTToken(`${email}`, 1800);
      let userInfo = {
        email: existedUser.email,
        lastVisted: Date.now(),
      };
      response.data = {
        user: userInfo,
        token: token,
      };
    }
  } catch (err) {
    console.log(err);
    response = systemError(LOGIN.EXCEPTION);
  }
  res.send(response);
};

module.exports = {
  adminLogin
};
