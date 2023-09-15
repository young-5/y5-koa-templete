const config = require("../configs/config");
// mongoose.Promise = require('bluebird');
class MongoDB {
  constructor() {
    const mongoose = require("mongoose");
    this.mongoose = mongoose;
  }
  init() {
    let _this = this;
    this.mongoose
      .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("success:", "mongodb链接成功!");
        //  _this.mongoose.Promise = require('bluebird')
      })
      .catch((err) => {
        console.log("err:", "mongodb链接失败!", err);
      });
  }
}

module.exports = MongoDB;
