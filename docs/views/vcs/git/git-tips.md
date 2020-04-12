---
title: git常用命令
date: 2019-12-15
tags:
 - git
categories:
 - 版本控制
---

# git常用命令


## 1. commit 撤销(本地操作修改还未提交到远程仓库) 

* `git add` 前
```bash
#撤销修改
git checkout [.|fileName]
```
* `git add` 后 `git commit` 前
```bash
#取消暂存(修改依然存在)
git reset HEAD <filename>
#撤销修改
git checkout <filename>
```
* `git commit` 后 `git push` 前
```bash
# 修改上一次commit的描述信息
git add test.txt #可以有新的文件修改
#--no-edit 并到上一次commit并沿用commit信息
git commit --amend [--no-edit | -m "replace 说明"]

```

## 2. 版本回滚(已经提交到远程分支)
* 回滚到tag
```bash
git checkout <tag>
```
* 文件回滚
```bash
# 查看指定文件的历史版本
git log <filename>
# 回滚到指定commitID
git checkout <commitID> <filename>
```

* 删除远程提交
```bash
# 删除但是保留记录
git revert HEAD
git push origin master

# 彻底删除
git reset --hard HEAD^
git push origin master -f

```



## 2. 删除tag以及远程分支tag
```bash
#查看tag
git tag [-l]
#删除 tag
git tag -d <tag name>
#删除远程tag
git push origin :refs/tags/<tag name>

#批量删除 (需要利用awk ,window下不可用)
git tag -l| awk '/^b_4.0.0_201806[0-9]{6}$/ {print $1}' | xargs git tag -d
#批量删除远程
git show-ref --tag | awk '/^b_4.0.0_201806[0-9]{6}$/ {print ":" $2}' | xargs git push origin

```