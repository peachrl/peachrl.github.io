---
title: LAMMPS中的条件与循环
date: 2021-03-13 13:06:45
updated: 2021-03-13 13:06:45
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- LAMMPS
	- Windows
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

Lammps可以通过jump和label命令进行循环，以及if命令设定条件。

<!-- more -->

jump命令：`jump file label`，表示前往读取file文件中对应label往后的语句。jump命令既可以让lammps连续地读取多个文件中的语句，也可以重复读取自身的一段甚至全部语句。如果要读取自身，file处可简写为SELF。

## 举例

```
#in.loop
#---------------------初始化模拟------------------------
units               real
atom_style          charge
boundary            p p p

lattice             custom 1.0 a1 2.456 0.0 0.0 a2 0.0 4.254 0.0 a3 0.0 0.0 6.708 &
                    basis 0.0 0.0 0.25 &
                    basis 0.5 0.16666666667 0.25 &  
                    basis 0.5 0.5 0.25 &
                    basis 0.0 0.66666666667 0.25 &
                    basis 0.0 0.33333333333 0.75 &
                    basis 0.5 0.5 0.75 &  
                    basis 0.5 0.83333333333 0.75 &
                    basis 0.0 0.0 0.75

region              graphite block 0 20 0 10 1.5 2.5 units lattice
region              box block 0 24.56 0 21.27 0 23.54 units box
region              insert sphere 12 10 23 1 units box

create_box          2 box
create_atoms        1 region graphite

group               graphite region graphite
group               insert dynamic all region insert every 1
group               O type 2

mass                1 12.0107
mass                2 15.9994

#---------------------势函数设置------------------------
pair_style          reax/c NULL
pair_coeff          * * ffield.reax.2010 C O

neighbor            2.0 bin
neigh_modify        every 1 delay 0 one 10000000 page 100000000
#-----------------------运行----------------------------

velocity            graphite create 500 21474 dist gaussian
fix                 1 all qeq/reax 1 0.0 10.0 1e-6 reax/c
fix                 2 graphite nvt temp 500.0 500.0 10.0
fix                 3 insert addforce 0.1 0.1 -10
fix                 4 O nve

thermo_style        custom step time pe ke etotal temp press atoms vol
thermo              10

dump                graph all xyz 10 CAr.0.xyz

timestep            1
run                 500
undump              graph
#--------------------循环入射一个粒子

label               loop
variable            i loop 400

create_atoms        2 single 12 10 23 units box
unfix               4
group               O type 2
fix                 4 O nve

dump                graph all xyz 10 CAr.${i}.xyz

run                 500

undump              graph

#--------------------增加跳出循环的条件
if                  "$(step) > 8000" then &
                    "jump SELF break" &
else                "next i" &
                    "jump SELF loop"
#--------------------跳出
label               break
unfix               4
unfix               3
unfix               2
unfix               1
#-----------------------退出------------------------
quit

```

以下是在win10里安装预编译的LAMMPS executables串行4线程计算的，在命令行输入`lmp_serial -pk omp 4 -sf omp -in in.loop`，将得到的.xyz文件在OVITO里导出成视频如下。

<iframe src="https://player.bilibili.com/player.html?aid=587063281&bvid=BV1Jz4y117hE&cid=309316146&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 512px; height: 512px; max-width: 100%"> </iframe>

红色小球表示的C原子,蓝色小球表示的O原子。刚开始盒子中部有2层C原子，没有O原子；随着每一轮循环，O原子不断被加到模拟盒子中，直到运行了8000步提前停止模拟。

