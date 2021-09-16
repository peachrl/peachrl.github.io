---
title: Android手机向Deepin系统投屏
date: 2021-08-10 13:39:57
updated: 2021-08-10 13:39:57
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Linux
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

最近将实验室的电脑重装了系统，系统版本是Deepin 20.2.3，于是又需要重新安装各种软件以及连接打印机等。由于实验室的打印机位于实验室内部网络中，且更改了默认端口，因此无法直接搜索到，需要手动安装。本文记录了在Deepin系统连接实验室内网打印机的过程。

<!-- more -->

> （以下信息仅为示例，都是随便写的）
>
> 打印机网络地址：ab.lab.cn
>
> 端口：12345
>
> 型号：HP LaserJet MFP M30w

1. 打开Deepin系统默认的打印管理器（在启动器（相当于Win中的开始菜单）中搜索即可找到），如下图所示，点击打印机设备后面的`+`开始配置；

   ![image-20210916102311846](https://image.wanyijizi.com/20210915/image-20210916102311846.png)

2. 软件首先会进行自动查找，这个过程自动开始并很快完成，但显示的一些网络上的打印机都不是我们的，如图所示：

   ![image-20210916102426299](https://image.wanyijizi.com/20210915/image-20210916102426299.png)

3. 点击进入`URI查找`，输入`socket://ab.lab.cn:12345`，如图所示，点击下一步；

   ![image-20210916102508312](https://image.wanyijizi.com/20210915/image-20210916102508312.png)

4. 接下来选择驱动来源，直接进入左边第三项`搜索打印机驱动`，输入型号`HP LaserJet MFP M30w`，点击`搜索`，选择搜索到的驱动中HP LaserJet MFP M28-M31那个，如图所示，点击安装驱动；

   ![image-20210916102533030](https://image.wanyijizi.com/20210915/image-20210916102533030.png)

5. 已经成功了，可以查看打印机

   ![image-20210916102600614](https://image.wanyijizi.com/20210915/image-20210916102600614.png)

