const bcrypt = require("bcryptjs"); // 提供通用的加密和哈希算法
const saltRounds = 12; // 生成salt的迭代次数
const tools = {
  enbcrypt(value) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(value, salt);
    return hash;
  },
  async encryptAsync(value) {
    return new Promise((resolve, reject) => {
      // 生成salt并获取hash值
      bcrypt.genSalt(saltRounds, function (err, salt) {
        err && reject(err);
        bcrypt.hash(value, salt, function (err, hash) {
          // 把hash值赋值给 变量
          err ? reject(err) : resolve(hash);
        });
      });
    });
  },
  verifyCompare(value, value2) {
    return bcrypt.compareSync(value, value2);
  },
  async verifyCompareAsync(value, value2) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(value, value2, function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
};
module.exports = tools;
