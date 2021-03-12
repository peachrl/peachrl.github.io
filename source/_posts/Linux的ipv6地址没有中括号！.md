---
title: Linux的ipv6地址没有中括号！
date: 2021-03-11 19:35:20
updated: 2021-03-11 19:35:20
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

实验室最近改了ipv6的地址，结果我在Win10里设置的hosts能连上实验室的ipv6地址，而Deepin V20系统连不上。困惑了两天终于想起来，上一次我也遇到过这个问题，其实是Linux的ipv6地址写法和Windows不一样。。在此记录，希望下次不会再忘记了。

Windows系统里ipv6地址写作：

```
[1010:200:3:ee22:0:bbbb:ffff:4000]  lab.com #随便打的地址，非真
```

Linux系统里不需要写中括号！！

```
1010:200:3:ee22:0:bbbb:ffff:4000  lab.com #随便打的地址，非真
```

<!-- more -->

马上就连上了~