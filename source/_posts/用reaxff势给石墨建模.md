---
title: 用reaxff势给石墨建模
date: 2020-05-01 18:53:19
updated: 2020-05-01 18:53:19
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

## 准备工作

 LAMMPS + USER-REAXC  + MOLECULE packages

<!-- more -->

### 安装msi2lmp

![1588299887184](https://image.wanyijizi.com/20200501/1588299887184.png)

安装完成在src出现msi2lmp.exe，用于将从Materials Studio等软件生成的模型中得到lammps需要的data文件。

## data文件 

### 在Materials Studio中建模

<img src="https://image.wanyijizi.com/20200501/1588300254517.png" alt="1588300254517" style="zoom: 67%;" />

<img src="https://image.wanyijizi.com/20200501/1588300275226.png" alt="1588300275226" style="zoom:80%;" />

#### 在Modules→Forcite→Calculation中设置势函数：

![1588300406711](https://image.wanyijizi.com/20200501/1588300406711.png)

不需要Run，直接关闭窗口。

#### 导出成car格式：

会生成car和mdf两个文件。

![1588300531058](https://image.wanyijizi.com/20200501/1588300531058.png)

### 用msi2lmp转换：

```shell
./msi2lmp.exe graphite -p o -frc cvff -i -n > data.graphite
```

生成data.graphite和graphite.data两个文件，其中graphite.data就是需要的文件。

```
LAMMPS data file. msi2lmp v3.9.9 / 05 Nov 2018 / CGCMM for graphite

    100 atoms
    150 bonds
    300 angles
    600 dihedrals
    100 impropers

   1 atom types
   1 bond types
   1 angle types
   1 dihedral types
   1 improper types

    -6.150000000     6.150000000 xlo xhi
    -5.326056233     5.326056233 ylo yhi
    -3.400000000     3.400000000 zlo zhi
    -6.150000000     0.000000000     0.000000000 xy xz yz

Masses

   1   12.0107 # xx



Atoms # full

      1      1   1  0.000000     0.000000000     0.000000000     1.700000000   0   0   0 # xx
      2      1   1  0.000000     0.000000000    -0.000000000    -1.700000000   0   0   1 # xx
......
```



## 势文件

examples→reax→FC→ffield.reax.FC

## input脚本

```
boundary     p p p
units        real #用reaxff势需要选real单位
atom_style   full #看生成的data文件里写了要用full，这需要安装MOLECULE package

read_data	 graphite.data

#mass		*   12.0107

pair_style	reax/c NULL #要用reaxff势，需要安装USER-REAXC
pair_coeff	* * ffield.reax.FC C
neighbor     2. bin #截断半径，与单位有关，详细见附录
neigh_modify	every 10 delay 0 check no #截断半径的刷新频率

#Langevin random seed
variable     dt equal 2e-3
variable     r  equal 57085
variable     T  equal 300
variable     dT equal "v_dt * 100"

# initialize
velocity     all create $T 28459 rot yes dist gaussian mom yes
fix          1 all langevin $T $T ${dT} 73504 zero yes
fix		2 all nve
fix             3 all qeq/reax 1 0.0 10.0 1e-6 reax/c #用reaxff必须要有电荷守恒条件

timestep	0.25

#dump    1 all movie 10 reaxff.mp4 type type
dump   2 all xyz 10 dump.reaxff.xyz

run                 1000
```

## 运行结果

<iframe src="//player.bilibili.com/player.html?aid=455404859&bvid=BV1a5411x7ZG&cid=185652449&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 512px; height: 512px; max-width: 100%"> </iframe>

## 附录

### 截断半径

> 0.3 bin for units = lj, skin = 0.3 sigma
>
> 2.0 bin for units = real or metal, skin = 2.0 Angstroms
>
> 0.001 bin for units = si, skin = 0.001 meters = 1.0 mm
>
> 0.1 bin for units = cgs, skin = 0.1 cm = 1.0 mm