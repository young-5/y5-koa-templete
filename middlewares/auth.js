// token.js
const Token = require("../helper/token");
const config = require("../configs/api");

const verifyToken = async (ctx, next) => {
  let url = ctx.request.url.split("?")[0];
  // 以下接口不校验token
  let url_config = config.accessPath;

  // 检测接口是否在不校验接口列表中
  const isDev = process.env.NODE_ENV;
  const all_access_url = [...url_config];
  let changer = all_access_url.some((item) => {
    return item == url;
  });
  if (changer || isDev) {
    // 不检测token
    await next();
  } else {
    // 检测token
    let token = ctx.request.headers["authorization"]?.replace("Bearer ", "");
    if (token) {
      await Token.decode(token, ctx, next);
    } else {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: "登录信息错误",
      };
    }
  }
};
module.exports = verifyToken;
