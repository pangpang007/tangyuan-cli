const { checkFileName, log } = require("../utils");

const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

function copyfile(type, name) {
  const targetDir = path.join(__dirname, `./${String(type).toLowerCase()}`);
  const distDir = path.join(process.cwd(), `./src/containers/${name}`);
  log("targetDir -->  " + targetDir, "warning");
  log("distDir -->  " + distDir, "warning");
  const _t =
    "/Users/mengxiaojing/Documents/Projects/tangyuan-cli/cli-project/template/singletable";
  const _d =
    "/Users/mengxiaojing/Documents/Projects/tangyuan-cli/mtl-base-project/src/containers/CardPage";
  fse
    .copy(targetDir, distDir)
    // .copy(_t, _d)
    .then(() =>
      log(`${type}模版创建成功，目录：src/containers/${name}`, "success")
    )
    .catch((err) => log(`${type}模版创建失败：` + err, "error"));
}

/**
 * 新建模版文件
 * @param {string} type 模版名称
 * @param {string} name 创建目录名称
 * @returns
 */
function createTemplate(type, name) {
  log(`Template Type : ${type} , Template Name : ${name}`);
  if (!checkFileName(name)) {
    return;
  }
  if (!checkFilePath()) {
    log("请在根目录执行添加模版文件操作", "error");
    return;
  }
  copyfile(type, name);
}

/**
 * 判断当前是否是在base项目的顶层执行
 */
function checkFilePath() {
  const paths = fs.readdirSync(process.cwd());
  log("paths --> ", paths, "info");
  return paths.findIndex((item) => item == "package.json") !== -1;
}
module.exports = {
  createTemplate,
};
