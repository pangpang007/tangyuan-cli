//命令行美化工具
const chalk = require("chalk");
/**
 * 不同类型的提示
 * @param {string} message  提示信息message
 * @param {boolean} needWrap 是否需要换行，默认需要
 */
function log(message, type = "info", needWrap = true) {
  const consoleLog = console.log;
  const combineText = `${needWrap ? "\n" : ""}${message}${
    needWrap ? "\n" : ""
  }`;
  switch (type) {
    case "success":
      consoleLog(chalk.green(combineText));
      break;
    case "warning":
      consoleLog(chalk.yellow(combineText));
      break;
    case "info":
      consoleLog(chalk.blue(combineText));
      break;
    case "error":
      consoleLog(chalk.red(combineText));
      break;
  }
}

/**
 * 校验App Name的合法性
 * @param {string} name
 * @returns
 */

function checkFileName(name) {
  let valid = true;
  try {
    if (name == "" || name == null || name == undefined) {
      throw new Error("文件名不能为空！");
    }
  } catch (err) {
    valid = false;
    log(`filename ${name} is Not Validate , ${err.message || ""}`, "error");
  } finally {
    return valid;
  }
}
module.exports = { checkFileName, log };
