//下载git仓库的repo
const download = require("download-git-repo");

//实现与用户问询交互的功能
const inquirer = require("inquirer");

const path = require("path");
const { checkFileName, log } = require("./utils.js");
const { createTemplate } = require("./template/index.js");
/**
 * 创建基础App项目
 * @param {string} name  创建的App名称，从控制台接收
 * @returns
 */
function cmd_createApp(name) {
  log(`Receive Project Name : ${name}, start Create App!`, "info");

  const filename = path.join(process.cwd() + `/${name}`);
  if (!checkFileName(name)) {
    return;
  } else {
    download(
      `github:pangpang007/tangyuan-react-base`,
      filename,
      function (err) {
        if (err) {
          log("download repo Error:", "error", false);
          log(err, "error");
        } else {
          log("download repo Success:", "success");
          log(`      cd ${name}  &&  npm install    `, "success");
        }
      }
    );
  }
}

/**
 * 选择并输入名称，创建UI模版
 */
function cmd_addTemplate() {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        name: "type",
        type: "list",
        message: "which type template",
        choices: [
          {
            name: "singletable",
            checked: true,
          },
          {
            name: "treetable",
          },
        ],
      },
    ])
    .then(({ type }) => {
      inquirer
        .prompt([
          {
            name: "name",
            type: "input",
            message: "Whats template Name?",
          },
        ])
        .then(({ name }) => {
          createTemplate(type, name);
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

module.exports = {
  cmd_createApp,
  cmd_addTemplate,
};
