---
title: 用Atomsk给lammps建立data文件
date: 2021-08-18 10:28:19
updated: 2021-08-18 10:28:19
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- LAMMPS
	- Atomsk
	- Linux
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

前面有一篇文[用MaterialStudio和Ovito给lammps建立data文件](https://peachrl.github.io/2021/06/18/%E7%94%A8MaterialStudio%E5%92%8COvito%E7%BB%99lammps%E5%BB%BA%E7%AB%8Bdata%E6%96%87%E4%BB%B6/)，但是博主桃非常穷，Material Studio软件只用得起盗版，因此这一篇文给出了另一种建模方法，用开源软件Atomsk给lammps建立data文件。

<!-- more -->

### Atomsk软件的安装

系统：Deepin 20.2.2

1. 下载[安装包](https://atomsk.univ-lille.fr/dl.php)
2. 解压并进入文件夹
3. `sudo bash install.sh`

### Atomsk的使用

Atomsk软件没有图形界面，所有操作在命令行进行。命令基本是`atomsk+输入文件/mode命令+options命令+输出文件名`的格式。例如生成粒子数5600共7层的石墨壁面：

```shell
atomsk --create graphite 2.464 6.711 C -orthogonal-cell -duplicate 20 10 4 -cut above 0.75*BOX z big-graphite.lmp
```

其中

- `--create graphite 2.464 6.711 C`是我们使用的mode命令，表示以graphite晶体格式，a=2.464Å，b=6.711Å，原子种类为C原子，生成晶胞
- `-orthogonal-cell`是option命令，表示将晶胞修改为正交的
- `-duplicate 20 10 4`是option命令，表示将晶胞沿x、y、z方向复制20×10×4倍
- `-cut above 0.75*BOX z`是option命令，表示将前面生成的模型切除z的正方向最上面占比0.25的部分
- `big-graphite.lmp`最后输出文件名big-graphite，格式为.lmp（也就是lammps的data文件格式）

在终端中显示：

![image-20210819104759688](https://image.wanyijizi.com/20210818/image-20210819104759688.png)

查看生成的文件：

![image-20210819110036133](https://image.wanyijizi.com/20210818/image-20210819110036133.png)

在ovito中查看：

![image-20210819104923195](https://image.wanyijizi.com/20210818/image-20210819104923195.png)

非常容易。

