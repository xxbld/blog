---
title: node环境配置
lang: zh
meta:
  - name: node environment
    content: node environment
  - name: node environment
    content: node environment
---
# node 基本配置

## 一、nvm
node 多个版本切换 ;安装前需要删除原来的node;

建议使用lts版本[官网](https://nodejs.org/en/)

>windows: [nvm-windows](https://github.com/coreybutler/nvm-windows)


>mac/linux: [nvm](https://github.com/nvm-sh/nvm)

## 二、npm/yarn 源设置
node 包管理器源设置 
1. npm

* 使用nrm设置
```bash
npm install -g nrm
nrm ls
nrm use taobao
```

* 设置npm参数
```bash
#设置淘宝源
npm config set registry https://registry.npm.taobao.org 
```
2. yarn
```bash
yarn config set registry https://registry.npm.taobao.org 
```
3. 使用文件设置npm和yarn的config 【.npmrc .yarnrc】

*notice:* node-sass 等二进制包的版本与当前使用node版本存在对应关系，而淘宝镜像可能不会即时同步最新版本

.npmrc
```
registry=https://registry.npm.taobao.org
disturl=https://npm.taobao.org/dist
chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
operadriver_cdnurl=https://npm.taobao.org/mirrors/operadriver
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs
fse_binary_host_mirror=https://npm.taobao.org/mirrors/fsevents
sass_binary_site=https://npm.taobao.org/mirrors/node-sass
electron_mirror=https://npm.taobao.org/mirrors/electron
puppeteer_download_host=https://storage.googleapis.com.cnpmjs.org
CYPRESS_INSTALL_BINARY=https://npm.taobao.org/mirrors/cypress/3.1.3/osx64/cypress.zip
```
.yarnrc
```
registry "https://registry.npm.taobao.org"
chromedriver_cdnurl "https://npm.taobao.org/mirrors/chromedriver"
disturl "https://npm.taobao.org/dist"
electron_mirror "https://npm.taobao.org/mirrors/electron"
fse_binary_host_mirror "https://npm.taobao.org/mirrors/fsevents"
operadriver_cdnurl "https://npm.taobao.org/mirrors/operadriver"
phantomjs_cdnurl "https://npm.taobao.org/mirrors/phantomjs"
sass_binary_site "https://npm.taobao.org/mirrors/node-sass"
puppeteer_download_host "https://storage.googleapis.com.cnpmjs.org"
CYPRESS_INSTALL_BINARY "https://npm.taobao.org/mirrors/cypress/3.1.3/osx64/cypress.zip"
```

## 三、

