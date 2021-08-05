---
title: LAMMPS最新版（30 Jul 2021）安装要点
date: 2021-08-05 21:47:13
updated: 2021-08-05 21:47:13
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- LAMMPS
	- Linux
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

当前LAMMPS最新的stable版本是`29 Oct 2020`，安装步骤同之前的博文所述[这里](https://peachrl.github.io/2020/04/06/%E5%9C%A8Deepin%E7%B3%BB%E7%BB%9F%E5%AE%89%E8%A3%85LAMMPS%E7%9A%84Makefile.ubuntu/)。

但是最新的unstable版（或者称为patch release）的packages有不少更改。

<!-- more -->

最新的unstable版`30 Jul 2021`通过git从以下命令获取安装包：

```shell
git clone -b unstable https://github.com/lammps/lammps.git mylammps
```

安装packages的命令依然是：

```shell
make yes-PACKAGENAME
```

但是之前所有前面带有`USER-`的package都被改名或者拆开重组，比如之前的`USER-REAXC`现在为`REAXFF`，之前的`USER-MISC`及其他一些相关的packages被拆分重组出`INTERLAYER`等不少新的packages，具体如何按需安装需要阅读[Manual](https://www.lammps.org/doc/Manual.html)。

其他安装步骤同之前的博文所述[这里](https://peachrl.github.io/2020/04/06/%E5%9C%A8Deepin%E7%B3%BB%E7%BB%9F%E5%AE%89%E8%A3%85LAMMPS%E7%9A%84Makefile.ubuntu/)，已在Deepin 20.2.2系统上得到验证。

----------

### 另：

`30 Jul 2021`相比于`29 Oct 2020`必然有很多有用的新特性，目前发现一个很有用的：

`pair_style              hybrid lj/cut 12.5 reaxff NULL`

这行代码在旧版本会报错，但是在新版本ReaxFF力场可用在`pair_style hybrid`命令中。