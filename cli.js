#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
// console.log("tangyuan-cli working~");

//命令行指令配置
const { program, Command } = require("commander");
//获取package配置文件
const package = require("./package.json");
//命令行美化工具
const chalk = require("chalk");
//实现与用户问询交互的功能
const inquirer = require("inquirer");

function createApp(name) {}

function createTempletePage(type, name) {
  console.log("create success-->", "type:", type, "name:", name);
}

const programs = new Command();

program.name(package.name).usage(`<command> [option]`);

program.version(package.version);

program
  .command("create-base-app")
  .alias("create")
  .description("create base App project")
  .action(() => {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "Please input project name:",
        },
      ])
      .then(({ name }) => {
        createApp(name);
      });
  });

program
  .command("add-templete-page")
  .alias("atp")
  .description("add templete page file in Package page")
  .action(() => {
    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          name: "type",
          type: "list",
          message: "which type templete",
          choices: [
            {
              name: "single-table",
              checked: true,
            },
            {
              name: "tree-table",
            },
          ],
        },
      ])
      .then(({ type }) => {
        // Use user feedback for... whatever!!
        inquirer
          .prompt([
            /* Pass your questions in here */
            {
              name: "name",
              type: "input",
              message: "Whats Templete Name?",
            },
          ])
          .then(({ name }) => {
            // Use user feedback for... whatever!!
            console.log("name", type, name);
            createTempletePage(type, name);
          });
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });

program.parse(process.argv);
