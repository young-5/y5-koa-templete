const Router = require("koa-router");
const Directory = require("require-directory");
const { BASE_PAI } = require("../configs/config");
class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.initLoadConfig();
  }

  static initLoadRouters() {
    function checkRouter(obj) {
      if (obj instanceof Router) {
        obj.prefix(BASE_PAI);
        InitManager.app.use(obj.routes(), obj.allowedMethods());
      }
    }
    const path = process.cwd();
    Directory(module, `${path}/routes`, { visit: checkRouter });
  }

  static initLoadConfig() {
    const path = process.cwd() + "/configs/config.js";
    global.config = require(path);
  }
}

module.exports = InitManager;
