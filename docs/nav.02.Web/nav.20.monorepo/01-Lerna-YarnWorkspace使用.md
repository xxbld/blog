# Lerna-YarnWorkspace使用
lerna 和yarn workspace搭配使用的情况下

一般lerna负责发布操作,yarn workspace负责依赖管理

## yarn workspace使用
```bash
yarn | yarn install # 等价于 lerna bootstrap --npm-client yarn --use-workspaces

lerna clean # 清理所有的node_modules
yarn workspaces run clean # 执行所有package的clean操作

#给模块安装依赖
yarn workspace packageB add packageA
#给模块删除依赖
yarn workspace packageB remove packageA

#根节点安装依赖
yarn add -W -D typescript
#根节点删除依赖
yarn remove -W -D typescript

```
## lerna 使用
```bash
# 创建包
lerna create @demo/xxx
#更新版本(会创建tag 并推送到远程分支)
lerna version
# 包含version已经npm发布操作
lerna publish
```
## 使用commitizen && cz-lerna-changelog格式化commit
```bash
yarn add -D commitizen cz-lerna-changelog
```
* 修改root package.json
```json
{
  "name": "root",
  "private": true,
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-lerna-changelog"
    }
  }
}

```
## commitlint && husky (强制使用提交规范 yarn run commit)
* 安装 commitlint 以及要遵守的规范
```bash
yarn add -D @commitlint/cli @commitlint/config-conventional
```
* 增加配置文件 `commitlint.config.js`
```js
module.exports = { 
  extends: ['@commitlint/config-conventional'] 
}
```
* 安装 husky （git 钩子） 修改`package.json`
```bash
yarn add -D husky
```
```json
"husky": { 
 		"hooks": { 
    		"commit-msg": "commitlint -E HUSKY_GIT_PARAMS" 
     }
 }
```
