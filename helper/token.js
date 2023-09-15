let config = require("../configs/config");
var jwt = require("jsonwebtoken");

const Token = {
  creacteToken: (user) => {
    const token = jwt.sign(
      {
        userId: user.id,
        userName: user.name,
      },
      config.secret,
      {
        expiresIn: 36000,
      }
    );
    console.log("token:", token);
    return token;
  },
  decode: async (token, ctx, next) => {
    return jwt.verify(token, config.secret, async (err, decode) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: "token已过期",
          };
        } else if (err.name == "JsonWebTokenError") {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: "无效的token",
          };
        }
      } else {
        if (decode.userId && decode.userName) {
          ctx.userId = decode.userId;
          return next();
        } else {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: "token错误",
          };
        }
      }
    });
  },
};
module.exports = Token;
