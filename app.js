const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
// const json = require("koa-json");
const onerror = require("koa-onerror");
// const bodyparser = require("koa-bodyparser"); //无法处理文件
const logger = require("koa-logger");
const koaBody = require("koa-body");
const parameter = require("koa-parameter");
// const mongoose = require("mongoose");

const InitManager = require("./cores/init");
const log4Util = require("./middlewares/log4Util");
const catchError = require("./middlewares/catcherror");
const routeFilter = require("./middlewares/routeFilter");
const auth = require("./middlewares/auth");

// const { createRedis } = require("./servers/redis");

const dayjs = require("dayjs");

app.use(log4Util);
app.use(catchError);
onerror(app, {
  json: function (err, ctx) {
    console.log("json  onerror:", err);
    ctx.body = "onerror 抛出：程序异常";
  },
  html: function (err, ctx) {
    console.log("html  onerror:", err);
  },
});
// const mongoose = require("mongoose");
// mongoose
//   .connect(config.MONGODB_URL, {
//     // useNewUrlParser: true
//   })
//   .then(() => {
//     console.log("success:", "mongodb链接成功!");
//   })
//   .catch((err) => {
//     console.log("err:", "mongodb链接失败!", err);

// app.use(
//   bodyparser({
//     enableTypes: ["json", "form", "text"],
//   })
// );

// app.use(json());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      // uploadDir: path.join(__dirname, 'public/uploads'),
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      keepExtensions: true,
      // multipart: true
    },
  })
);
app.use(parameter(app));
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));
app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);
require("./helper/session")(app);
// redis连接
// createRedis();

// 路由处理中间件：html静态支援返回 路由转发 特殊路由处理等
app.use(routeFilter);

// 访问日志打印
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(
    `${ctx.method} ${ctx.url} - ${ctx.status} - ${dayjs().format(
      "YYYY-MM-DD HH:mm:ss"
    )} - ${ms}ms`
  );
});
app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.body = "<h2>你所访问的内容不存在</h2>";
  }
});
// 权限校验
app.use(auth);
// 路由
InitManager.initCore(app);

// error-handling
app.on("error", (err, ctx) => {
  console.error("server on error:", err, ctx);
});
app.on("error-info", (err, ctx) => {
  console.error("server on error-info:", err, ctx);
});

module.exports = app;
