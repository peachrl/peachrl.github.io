---
title: Mendeley在Deepin系统的安装及解决无法输入中文的问题
date: 2021-09-16 23:08:30
updated: 2021-09-16 23:08:30
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Linux
	- Mendeley
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

Mendeley在Linux系统无法输入中文注释的问题一直没有在官方的安装包中得到解决，但有网友提供的完美解决方法，在此记录。

<div class="success">

> 系统：Deepin 20.2.3

</div>

<!-- more -->

## Mendeley Desktop 安装

安装包从[官网](https://www.mendeley.com/download-desktop-new/)下载，我下载的是`Download for generic Linux`。（不过Deepin系统内核是Debian，所以也许另一个也行？）

按照官方的[安装教程](https://www.mendeley.com/guides/download-mendeley-desktop/linux/instructions)，下载解压进入bin就可以直接运行了。

如果需要在启动器中见到Mendeley，可以进入bin，如图运行shell脚本：

![截图_deepin-terminal_20210916153543](https://image.wanyijizi.com/20210916/截图_deepin-terminal_20210916153543.png)

这样就可以在启动器中看到Mendeley的存在了：

<img src="https://image.wanyijizi.com/20210916/截图_选择区域_20210916153641.png" alt="截图_选择区域_20210916153641" style="zoom:67%;" />

## 解决中文输入问题

下载由 yinflying 大佬提供的 libfcitxplatforminputcontextplugin.so 文件（从[github下载](https://github.com/yinflying/BlogSource/tree/master/lib-fcitx-plugin/debian.sid.20171223)or从[阿里云盘下载](https://www.aliyundrive.com/s/fjPTN5MSCYk)），放到`/data/home/peachrl/mendeley/lib/mendeleydesktop/plugins/platforminputcontexts`目录下即可。

## 参考文献

[1]https://www.jianshu.com/p/1dac2892613b

[2]https://github.com/yinflying/BlogSource/tree/master/lib-fcitx-plugin/debian.sid.20171223

