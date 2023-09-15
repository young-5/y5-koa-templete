const { HttpException } = require("../helper/http-exception");
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isDev = global?.config?.environment === "dev";
    const isHttpException = error instanceof HttpException;
    if (isDev) {
      if (!isHttpException) {
        throw error;
      }
    }
    if (error.status === 404) {
      ctx.status = 404;
      ctx.body = "无效 404";
    } else if (error.status === 401) {
      ctx.status = 401;
      ctx.body = "请登录";
    } else {
      ctx.logger?.logError?.(ctx, error);
      // 状态码 统一抛出
      if (isHttpException) {
        console.error("middelware server HttpException:", error);
        // 自定义异常实例
        ctx.status = error.code;
        ctx.body = {
          msg: error.msg,
          errorCode: error.errorCode,
          code: error.code,
        };
      } else {
        console.error("middelware server error:", error);
        ctx.status = 500;
        ctx.body = {
          msg: error.message,
          errorCode: 500,
          code: 500,
        };
      }
    }
  }
};

module.exports = catchError;
