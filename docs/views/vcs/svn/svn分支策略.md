---
title: svn分支策略
date: 2020-07-09
tags:
- 
categories:
- 版本控制
---

# svn分支策略

## 一. 分支命名规则
* 主干分支: trunk
* 新功能分支 : feature-[功能名]-[?版本号|xxx]
* bug修复 : fix-[版本号]-[?功能名|xxx]


## 二. 版本号命名规则

* 版本号规则: [大版本号].[功能分支版本号].[bug修复版本号] 如:`1.11.1`

> major.minor.patch
> 主版本号.次版本号.修补版本号
```bash
// npm 命令修改版本号
npm version major|minor|patch
```

## 三. 分支生命周期 

1. 新需求,新功能开发 `feature-new`:
   (1): 新建分支 --> 开发-->(提测)合并到 trunk(解决冲突) -->(功能完成)删除分支
   (2): (提测) 有bug-->开发-->重复合并trunk操作,直至消除全部bug 并顺利上线-->删除分支

2. trunk 上线操作:
   **提测,打包,修改版本号均由主干完成,如(package.json 1.1.0-->1.2.0)**
   (1):提测到trunk无任何异常后:修改主分支版本号 如 `1.1.0-->1.2.0`-->提交-->打包,打tag`1.2.0`

3. 已上线正式功能bug修复操作 `fix-1.2.1`:
   (1):从tag 1.2.0新建分支`fix-1.2.1`-->开发修复`包括修改版本号`-->直接从`fix-1.2.1`打包给测试进行单测->直至通过-->打tag`1.2.1`-->删除`fix-1.2.1`分支
    **疑问: 线上bug紧急修复,trunk要不要直接接受bugfix merge;**
    **前端还好:线上分支和bug分支基本维持在同一版本号变化之内**
    **移动端会存在 `1.2.0-1.2.9` 都有用户 但此时bug发生在`1.2.3`,此时如何更新**

## 四. 合并策略
1. 选择合并
2. 全部合并

## 五. 一些注意事项

1. feature分支应主动保持与trunk之间的更新(从trunk merge 到 feature 分支)**版本号是一个快速判断与trunk联系的文件**
   如:主干在`1.10.0`版本,而feature分支版本仅为 `1.8.0`此时开发人员应该主动更新trunk内容到feature分支,并解决冲突,(尽量把冲突在开发分支杀死)

2. 两人在不同feature分支,但此时两人需要封装一个公用方法(可以两人互相同步):
   此时可以两人都更新到与trunk分支相同的版本号,然后由一人完成封装,另一人合并此人的分支(并解决冲突,互相合并)
   

## 六. 提交信息规范
```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
revert: 回退
build: 打包
```

## 七. 后续引进 dev(预发|bate)分支


## extra
深入学习 SVN switch 操作**通过switch 貌似可以用来简化4-2操作,慎用!!!**

<!-- https://www.cnblogs.com/dabaopku/archive/2011/05/21/2052820.html -->
```
确实，以前不会用switch之前，就像文中提到的那样，先把trunk merge进branch，提交branch，再把branch merge进trunk，是很安全，很少会产生什么冲突，但是有点太麻烦了。

switch的危险在于，如果switch之后常常忘记哪些文件是switch过的，需要查看文件的属性或者看revision graph才能知道，比较麻烦，因此建议直接把自己工作的整个文件夹给swith过去。

另外，按照我的理解，trunk和branch的关系就应该是主从关系，trunk是通过branch不断地merge得到版本发展的；而branch应该是直接通过update就可以获得trunk的更新，所以感觉用switch才够正统。
```