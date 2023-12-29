const router = require("koa-router")();
const { getUserIp } = require("../utils/tools");
const { getCaptcha } = require("../helper/capCaptcha");
const { HttpException } = require("../helper/http-exception");
router.prefix("/base");
const build = require("../helper/bulidWen");
// 数字验证码
router.get("/captcha", async (ctx) => {
  const cap = getCaptcha();
  console.log("验证码：", cap.text.toLowerCase());
  ctx.type = "image/svg+xml";
  // session 记录
  let ip = getUserIp(ctx.request);

  console.log("ip:", ip);
  // ctx.session = {};
  // if (true) {
  //   // console.log(data.data.data);
  //   const error = new HttpException("服务端错误测试", 1222, 555);
  //   throw error;
  // }
  ctx.session[ip] = cap.text.toLowerCase();
  console.log("ctx.session", ctx.session);
  ctx.body = cap.data;
});

// 打包
router.get("/build", async (ctx) => {
  await build();
  ctx.body = "打包成功";
});

module.exports = router;
