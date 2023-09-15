const router = require("koa-router")();
const fileService = require("../servers/file");
const filesUtil = require("../utils/files");
const path = require("path");

// 创建图片上传映射
const setAssetsMap = async (url, basename) => {
  let fileConnect = await filesUtil.readFile("fileConnect");
  const setData = (oldDatas, url) => {
    let newdata = [
      ...oldDatas,
      {
        key: basename,
        url: url,
      },
    ];
    return newdata;
  };

  let newDataSource = setData(fileConnect ? JSON.parse(fileConnect) : [], url);
  filesUtil.writeFile("fileConnect", JSON.stringify(newDataSource));
};

// 文件上传 文件存在public/uploads中 数据直接存储地址
router.post("/uploadfile", async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  console.log("文件", file);
  let MD5 = file.originalFilename;
  let data = await fileService.uploadfile(ctx.request.files, async (url) => {});

  ctx.body = {
    code: 0,
    MD5: MD5,
    data: data,
  };
});

// 多文件上传 数据初始化
const addmorePhoto = async (data) => {
  let oldDataSource = await filesUtil.readFile("photos");
  const setData = (oldDatas, data) => {
    let lastdata = oldDatas[oldDatas.length - 1];
    let newdata = [
      ...oldDatas,
      {
        id: lastdata?.id ? lastdata?.id + 1 : 1,
        ...data,
      },
    ];
    return newdata;
  };
  let newStu = setData(oldDataSource ? JSON.parse(oldDataSource) : [], data);
  filesUtil.writeFile("photos", JSON.stringify(newStu));
};

// 文件集合上传
router.post("/uploadfiles", async (ctx, next) => {
  console.log("文件集合上传:", ctx.request.files);
  let data = await fileService.uploadfiles(ctx.request.files, async (obj) => {
    await setAssetsMap(obj.url, obj.MD5);
    await addmorePhoto(obj);
  });

  ctx.body = {
    code: 0,
    msg: data,
  };
});

router.post("/upload/bigFiles", async (ctx, next) => {
  console.log("data:", ctx.request.body);
  const file = ctx.request.body.file; // 获取上传文件
  let md5 = "111";

  let query = req.query;
  let fileName = query.fileName;
  let fileMd5Value = query.fileMd5Value;
  // 获取文件Chunk列表
  getChunkList(
    path.join(uploadDir, fileName),
    path.join(uploadDir, fileMd5Value),
    (data) => {
      resp.send(data);
    }
  );

  // 获取文件Chunk列表
  async function getChunkList(filePath, folderPath, callback) {
    let isFileExit = await isExist(filePath);
    let result = {};
    // 如果文件已在存在, 不用再继续上传, 真接秒传
    if (isFileExit) {
      result = {
        stat: 1,
        file: {
          isExist: true,
          name: filePath,
        },
        desc: "file is exist",
      };
    } else {
      let isFolderExist = await isExist(folderPath);
      // 如果文件夹(md5值后的文件)存在, 就获取已经上传的块
      let fileList = [];
      if (isFolderExist) {
        fileList = await listDir(folderPath);
      }
      result = {
        stat: 1,
        chunkList: fileList,
        desc: "folder list",
      };
    }
    callback(result);
  }

  ctx.body = {
    code: 200,
    data: {
      md5: md5,
    },
    msg: "success",
  };
});

module.exports = router;
