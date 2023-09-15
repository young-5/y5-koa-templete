const { REDIS_CONF } = require("../config/config");
let redisClient = null;
async function createRedis() {
  const redis = require("redis");
  redisClient = await redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
  console.log("redis链接成功");
  redisClient.on("error", (err) => {
    console.error("redis error", err);
  });
}
/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s
 */
function set(key, value, time = 60 * 60) {
  let val = value;
  if (typeof value == "object") {
    val = JSON.stringify(value);
  }
  if (!redisClient) {
    createRedis();
  }
  redisClient.set(key, val);
  redisClient.expire(key, time);
}
/**
 * redis get
 * @param {string} key 键
 */
async function get(key) {
  const promise = new Promise((resolve, reject) => {
    if (!redisClient) {
      createRedis();
    }
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    });
  });
  return await promise;
}

module.exports = {
  set,
  get,
  createRedis,
};
