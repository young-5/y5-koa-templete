const { exec } = require("child_process");
const path = require("path");
const util = require("util");
const execPromise = util.promisify(exec);

const webPath = path.resolve(__dirname, "../../react-vite-ts-app");
const buildPath = path.relative(process.cwd(), "/html");

// function exec() {
//   const child = spawnSync(cmd, {
//     shell: true,
//     stdio: ["pipe", "inherit", "inherit"],
//   });
//   if (child.status != 0) {
//     console.log(`[${getNowTime(0)}] ${item}失败`);
//   }
// }
// ...exec相关代码
const filePath = path.resolve(__dirname, "../../react-vite-ts-app");
var commands = ["cd ../react-vite-ts-app", "npm run build-serve"];

async function execCommands(commands) {
  let curAbsPath = process.cwd(); // 获取当前目录
  let index = 0;
  try {
    for (let i = 0; i < commands.length; i++) {
      index = i;
      const command = commands[i];
      if (command.startsWith("cd ")) {
        // 每次执行cd命令，不执行exec了
        curAbsPath = path.resolve(curAbsPath, command.replace("cd ", ""));
        continue;
      }
      // 每次执行非cd命令
      let newCommand = `cd ${curAbsPath} && ` + command;
      const res = await execPromise(newCommand);
      console.log(
        "exec command success",
        index,
        "[",
        commands[index],
        "]",
        "\n    value:",
        res
      );
    }
  } catch (error) {
    console.error(
      "exec command fail at:",
      index,
      "[",
      commands[index],
      "]",
      "\n    error:",
      error
    );
  }
}
async function build() {
  console.log("---------------- build start  -------------");
  console.log("filePath:", filePath);
  await execCommands(commands);
  console.log("---------------- build end  -------------");
}

module.exports = build;
