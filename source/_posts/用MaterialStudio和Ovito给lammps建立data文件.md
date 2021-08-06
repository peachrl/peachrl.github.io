---
title: 用MaterialStudio和Ovito给lammps建立data文件
date: 2020-06-18 13:23:54
updated: 2020-06-18 13:23:54
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- LAMMPS
	- Material Studio
    - Ovito
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

在LAMMPS上怎么给Pt(111)表面建模：

```
lattice fcc 3.9242 &
	 origin 0 0 0 &
	 orient x 1 -1 0 &
	 orient y 1 1 -2 &
	 orient z 1 1 1
```

得要像这样先算好每个轴的方向。有没有其他更加直观的方法呢？

<!-- more -->

需要安装软件 Material Studio，Ovito。（本文在 Win10 系统上安装的 [Material Studio 2019](https://www.aliyundrive.com/s/H4Ho5i3f2GG) 及 [Ovito 3.4.3](https://www.ovito.org/)，其中Material Studio 2019 是在网上找的破解版，极度难用，经常卡死，非常不推荐，有钱多金的朋友们可以入手正版，提倡支持正版，本文仅供学习和观摩，还有其他平民的建模方法，敬请期待其他博文）

在 Material Studio 上建立Pt的(111)表面模型，首先去网上下一个Pt晶体的cif模型（比如下面这个从[网站](http://www.crystallography.net/cod/search.html)下载）：

![image-20210806224807302](https://pic.imgdb.cn/item/610d51305132923bf8e2ae10.png)

导入 Material Studio 中：

![image-20210806225213902](https://pic.imgdb.cn/item/610d51305132923bf8e2ae15.png)

切开(111)表面，并拓展和加真空层，得到超大晶胞：

![image-20210806225438020](https://pic.imgdb.cn/item/610d51305132923bf8e2ae1b.png)

导出成cif格式，再导入Ovito：

![image-20210806230149609](https://pic.imgdb.cn/item/610d51305132923bf8e2ae09.png)

File→Export File，可以直接导出lammps的data格式。

