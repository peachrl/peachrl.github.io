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
	- Android
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

<div class="success">

> 运行环境：电脑系统 Deepin 20.2.2；手机系统 Hydrogen OS 11.0.10.10.IN21

</div>

因为最近需要用科技云会开组会，手机屏幕看组会太小而Deepin系统上没有这个软件，所以本桃开发了手机向Linux系统投屏的新技能√

主要工具为scrcpy，“scrcpy是免费开源的投屏软件，支持将安卓手机屏幕投放在 Windows、macOS、GNU/Linux 上，并可直接借助鼠标在投屏窗口中进行交互和录制”。

<!-- more -->

### 安装adb并开启服务

```shell
sudo apt-get install adb
adb start-server
```

adb是用来调试Android设备的，开启一次之后会一直开启（包括重启电脑），除非手动关闭。

### 安装scrcpy

我们直接尝试用`sudo apt-get install scrcpy`命令安装，但是失败了：

![image-20210813204307731](https://pic.imgdb.cn/item/611678af5132923bf8cfaa1b.png)

于是按照提示使用snap进行安装。首先安装snap，这是一个很受欢迎的软件包管理和部署系统：

```shell
sudo apt-get install snapd
```

再安装scrcpy：

```shell
sudo snap install scrcpy
```

这里网上有人遇到报错说缺少core18库，因此还需要安装一下`sudo snap install core`，不过我没有遇到。

### 手机开启开发者选项

这一步是为了adb能更方便调试以及允许模拟点击。

不同手机开启`开发者选项`的位置不一定相同。OnePlus 8手机的`开发者选项`要从`设置`进入，打开倒数第二项`关于手机`，快速多次点击`版本号`。

### 两种方法手机连接电脑

#### 有线连接

手机与电脑用数据线连接，开启USB调试。这时可以用`adb devices`查看到我们的手机设备：

![image-20210813211816433](https://pic.imgdb.cn/item/611678af5132923bf8cfaa3b.png)

#### 无线连接

虽说是无线连接，但实际上还是需要用一下数据线，否则是需要手机root才能实现的。

手机与电脑必须保持在同一局域网，用数据线连接，开启USB调试。

在手机里`设置`-`关于手机`-`状态信息`找到ip地址，或者在终端用命令`adb shell ip a`查看ip：

![image-20210813212241661](https://pic.imgdb.cn/item/611678af5132923bf8cfaa60.png)

在终端输入，让设备在5555端口监听TCP/IP连接（端口四位数都行）：

```shell
adb tcpip 5555
```

通过 IP 地址连接设备：

```shell
adb connect <手机ip>:5555
```

确认连接状态：

```shell
adb devices
```

![image-20210813212913008](https://pic.imgdb.cn/item/611678af5132923bf8cfaa7d.png)

这时能看到List of devices attached有两条，上面一条是无线连接的，下面一条是有线连接的。这时可以拔掉数据线，无线连接会依然保持。

类似的用`adb disconnect <手机ip>:5555`命令可以断开连接。

### scrcpy开始投屏

在`adb devices`显示有1个设备连接的情况下，在终端输入：

```shell
scrcpy
```

即可。

科技云会在Deepin上也可以顺利“打开”了：

![image-20210813214109597](https://pic.imgdb.cn/item/611678af5132923bf8cfaa93.png)

