var fs = require("fs");
module.exports = {
  readFile: async (fileName) => {
    if (!fs.existsSync(`dataFiles/${fileName}.json`)) {
      return false;
    }
    return fs.readFileSync(
      `dataFiles/${fileName}.json`,
      "utf-8",
      function (err, data) {
        if (err) throw err;
        return data;
      }
    );
  },
  writeFile: (fileName, data) => {
    fs.writeFileSync(
      `dataFiles/${fileName}.json`,
      data,
      "utf8",
      function (err) {
        if (err) throw err;
        console.log(fileName + "Saved");
      }
    );
  },
  serchData: (oldDatas, data, filterConfig, mobu = ["name"]) => {
    const filter = (configs, data, oldDatas) => {
      let flag = true;
      for (let i = 0; i < configs.length; i++) {
        if (mobu.includes(configs[i])) {
          if (
            oldDatas[configs[i]]?.includes(data[configs[i]]) ||
            !data[configs[i]]
          ) {
            flag = true;
          } else {
            flag = false;
          }
        } else {
          if (data[configs[i]] == oldDatas[configs[i]] || !data[configs[i]]) {
            flag = true;
          } else {
            flag = false;
          }
        }
      }
      return flag;
    };
    newdata = oldDatas?.filter((v) => {
      return filter(filterConfig, data, v);
    });
    return newdata;
  },
  addData: (oldDatas, data) => {
    let lastdata = oldDatas[oldDatas.length - 1];
    let newdata = [
      ...oldDatas,
      {
        id: data?.id ? data.id : lastdata?.id ? lastdata?.id + 1 : 1,
        ...data,
      },
    ];
    return newdata;
  },
  updataData: (oldDatas, data) => {
    let newdata = oldDatas?.map((v) => {
      if (v.id === data.id) {
        return data;
      }
      return v;
    });
    return newdata;
  },
  delData: (oldDatas, id) => {
    let newdata = oldDatas?.filter((v) => v.id != id);
    return newdata;
  },
  getData: (oldDatas, id, key = "id") => {
    let newdata = oldDatas?.find((v) => v[key] == id);
    return newdata;
  },
  // 原数据  关联数据文件名 原关联字段 关联数据字段 显示映射
  connectSearch: async (
    data,
    addFileName,
    ownSearchFile,
    searchFile = "id",
    showFile = []
  ) => {
    let data1 = await readFile(addFileName);
    data1 = data1 ? JSON.parse(data1) : [];
    let newData = data?.map((v) => {
      let obj = {};
      let showObj = {};
      if (Array.isArray(v[ownSearchFile])) {
        let arry = [];
        v[ownSearchFile]?.forEach((n) => {
          let _obj = data1.find((m) => m[searchFile] == n);
          arry.push(_obj);
        });
        showFile.forEach((n) => {
          showObj[n.ownvalue] = arry?.map((v) => v && v[n.value]);
        });
      } else {
        let obj = data1.find((m) => m[searchFile] == v[ownSearchFile]);
        showFile.forEach((n) => {
          showObj[n.ownvalue] = obj ? obj[n.value] : "";
        });
      }
      return {
        ...v,
        ...showObj,
      };
    });
    return newData;
  },
};
