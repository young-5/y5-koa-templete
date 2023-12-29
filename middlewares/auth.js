// token.js
const Token = require("../helper/token");
const config = require("../configs/api");

const verifyToken = async (ctx, next) => {
  let url = ctx.request.url.split("?")[0];

  // 检测接口是否在 接口白名单（不校验接口列表）中
  const isDev = process.env.NODE_ENV;
  const url_config = config.accessPath;
  const all_access_url = [...url_config];
  let routeAccess = all_access_url.some((item) => {
    return item == url;
  });
  if (routeAccess || isDev) {
    // 白名单
    await next();
  } else {
    // 身份验证
    let token = ctx.request.headers["authorization"]?.replace("Bearer ", "");
    if (token) {
      await Token.decode(token, ctx, next); // token解析与校验
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
