---
title: 在lammps中计算压强
date: 2021-04-08 23:31:01
updated: 2021-04-08 23:31:01
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- LAMMPS
	- Linux
aplayer: true
# type: bilibili
# url: 
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

在lammps的thermo输出中常常出现press项，输出的是整个系统的压强。如果要求lammps输出系统压强的分量或者部分体系受到的压强，则需要用到compute命令进行计算。

<!-- more -->

## 系统压强

系统压强可以用`compute ID all pressure ...`命令进行计算，输出结果为一个6维的向量，以此为对称张量压强在`xx yy zz xy xz yz`方向的分量。通过索引`1-6`能够对各分量进行访问，表示为`c_ID[索引]`，单位均为pressure单位。

## 部分压强

系统内部分压强需要采用`compute ID group-ID stress/atom ...`命令先计算group里各个原子所受的应力，同样分为`xx yy zz xy xz yz`6个方向的分量，单位为pressure单位。再通过`compute ID group-ID reduce ...`命令将group里所有原子的应力在一起进行计算，来求得group部分所受到的压强。

thermo输出的press量其实可以通过上述方法求得，这是[手册](https://lammps.sandia.gov/doc/compute_stress_atom.html)上已有说明的：

```
compute        peratom all stress/atom NULL
compute        p all reduce sum c_peratom[1] c_peratom[2] c_peratom[3]
variable       press equal -(c_p[1]+c_p[2]+c_p[3])/(3*vol)
```

这里得到的变量值v_press就和thermo输出的press相同。

需要注意的是这里的vol表示整个系统的体积。lammps里也没有能够直接求得部分体积的命令，相应地需要用`compute ID group-ID voronoi/atom ...`命令先求各个原子所占的等效体积，再由`compute ID group-ID reduce sum ...`相加求解。其中voronoi命令的使用需要VORONOI package的支持。

### 安装VORONOI package的方法

1. 首先从[voro++官网](http://math.lbl.gov/voro++/download/)下载voro++软件。解压进入安装包，依次输入：

```shell
make
sudo make install
ln -s voro++-0.4.6/src includelink #创造链接
```

命令进行安装。

2. 接着进入到lammps文件夹中lib/voronoi目录，更改Makefile.lammps：

```
voronoi_SYSINC = -I/usr/local/include/voro++
voronoi_SYSLIB = -lvoro++
voronoi_SYSPATH = -L/usr/local/lib
```

3. 进入lammps文件夹中src目录：

```
make yes-voronoi
sudo make ubuntu -j 4 #视个人情况编译
```
得到lmp_ubuntu，成功√

### 示例

```
compute		stressG g stress/atom NULL
compute		pressG g reduce sum c_stressG[1] c_stressG[2] c_stressG[3]
compute		volC g voronoi/atom
compute		volG g reduce sum c_volC[1] 
variable	pressSur equal -(c_pressG[1]+c_pressG[2]+c_pressG[3])/(3*c_volG)
```