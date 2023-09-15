const fs = require("fs");
const Path = require("path");

const fileService = {
  uploadfile: async (data, callback, path = "", fileName) => {
    // 上传单个文件
    const file = data.file;
    // 创建可读流
    const reader = fs.createReadStream(file?.filepath);
    let filePath =
      Path.join(__dirname, `../public/uploads/${path}`) +
      `/${fileName || file.originalFilename}`;
    // 返回图片地址
    callback &&
      (await callback(
        `uploads/${path}` + `/${fileName || file.originalFilename}`
      ));
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return;
  },
  uploadfiles: async (data, callback, filepath = "uploads", fileName) => {
    // 上传多个文件
    const files = data; // 获取上传文件
    let keys = Object.keys(files);
    for (let key of keys) {
      // 创建可读流
      const reader = fs.createReadStream(files[key].filepath);
      // 获取上传文件扩展名
      let filePath =
        Path.join(__dirname, `../public/uploads/${filepath}`) +
        `/${fileName || files[key].originalFilename}`;
      // 创建可写流
      const basename = path.basename(files[key].filepath);
      callback &&
        callback({
          url:
            `uploads/${filepath}` +
            `/${fileName || files[key].originalFilename}`,
          MD5: files[key].originalFilename,
          name: basename,
        });
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
    }
    return "上传成功！";
  },
};

module.exports = fileService;
