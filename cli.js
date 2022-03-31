#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
// console.log("tangyuan-cli working~");

//命令行指令配置
const { program } = require("commander");
//获取package配置文件
const package = require("./package.json");

const { cmd_createApp, cmd_addTemplate } = require("./commands.js");

program.name(package.name).usage(`<command> [option]`);

program.version(package.version);

program
  .command("create-base-app")
  .alias("create")
  .description("create base App project")
  .argument("<string>", "string to split")
  .action((str) => {
    cmd_createApp(str);
  });

program
  .command("add-template")
  .alias("add-t")
  .description("add template page file in Package page")
  .action(() => {
    cmd_addTemplate();
  });

program.parse(process.argv);
