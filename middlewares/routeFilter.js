const { relative } = require("path");
const { redirect_url } = require("../configs/config");
const fs = require("fs");
// 资源类型模块
mime = require("mime");
module.exports = async (ctx, next) => {
  if (ctx.request.url === "/web") {
    const html = fs.readFileSync("html/index.html", "utf-8");
    ctx.set("Content-Type", "text/html;charset=UTF-8");
    ctx.body = html;
  } else if (ctx.request.url.startsWith(redirect_url)) {
    // const url = ctx.request.url.replace("/xxx", "/api/v1");
    // get重定向 post重定向 方法 参数缺失
    // ctx.redirect(url);
    // ctx.status = 301;
    await next();
  } else if (ctx.request.url?.includes("/assets")) {
    let type = mime.getType(ctx.request.url);
    const assets = fs.readFileSync(`html${ctx.request.url}`);
    ctx.set("Cache-Control", ["private", "max-age=60"]);
    ctx.set("Content-Type", type + ";charset=UTF-8");
    ctx.body = assets;
  } else {
    await next();
  }
};
