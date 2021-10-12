---
title: LAMMPS中安装和使用KIM（Knowledgebase of Interatomic Models）
date: 2020-06-28 15:29:19
updated: 2020-06-28 15:29:19
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

<div class="success">


> OpenKIM is an interatomic potential repository and an online framework for making molecular simulations reliable, reproducible, and portable. 

</div>

<!-- more -->

以上说明来自网址：[OpenKIM](https://openkim.org/)

## 前提

已安装LAMMPS

## 安装 

### 查看安装方法

在LAMMPS的文件夹/home/peachrl/LAMMPS/lammps-3Mar20/lib/kim中，阅读README，得知将通过cmake进行安装。

### 安装cmake

1. 在[CMake](https://cmake.org/download/)下载安装包。

   ![1593324256673](https://image.wanyijizi.com/20200628/1593324256673.png)

2. 将安装包解压，进入cmake-3.18.0-rc2文件夹。

3. 终端输入```./bootstrap```

   - 若出现```Could NOT find OpenSSL```问题，根据提示安装OpenSSL ：```apt-get install libssl-dev```

4. ```make -j4```

5. ```sudo make -j4 install```

6. 查看安装情况```cmake --version```

![image-20200628154236953](https://image.wanyijizi.com/20200628/image-20200628154236953.png)

### 安装kim-api

1. 进入LAMMPS中/home/peachrl/LAMMPS/lammps-3Mar20/lib/kim文件夹。

2. 下载[kim-api-2.1.3](https://s3.openkim.org/kim-api/kim-api-2.1.3.txz)。（有不同版本，具体见[Obtaining KIM Models](https://openkim.org/doc/usage/obtaining-models/)）

3. 解压到当前文件夹。

4. ```$ cd kim-api-2.1.3```

5. ```$ mkdir build && cd build```

6. ```$ cmake ..  -DCMAKE_INSTALL_PREFIX=${PWD}/../../installed-kim-api-2.1.3```

   - 若出现```No CMAKE_Fortran_COMPILER could be found.```，安装gfortran：```$ sudo apt install gfortran```

7. ```$ make -j4```

8. ```$ make -j4 install```

9. 现在可以删除压缩包和安装包了

   ```
   $ cd ../../
   $ rm -rf kim-api-2.1.3
   $ rm -rf kim-api-2.1.3.txz
   ```
### build LAMMPS with the KIM package installed

- 进入/home/peachrl/LAMMPS/lammps-3Mar20/src文件夹，重新make ubuntu（之前make过的）：
```
$ make yes-kim
$ sudo make ubuntu -j4
```
- 移动和改个名：
```
$ mv lmp_ubuntu /home/peachrl/LAMMPS/bin/lmp4RMSPm.kim
```
### 添加path

```export PATH=/home/peachrl/LAMMPS/lammps-3Mar20/lib/kim/installed-kim-api-2.1.3/bin:$PATH```

![1593327313369](https://image.wanyijizi.com/20200628/1593327313369.png)

## 使用

==**测试算例**：LAMMPS自带的算例/home/peachrl/LAMMPS/lammps-3Mar20/examples/reax/CHO，将其改为使用OpenKIM。==

### 安装所需的KIM Model

在OpenKIM网站上找到需要的势：[Sim_LAMMPS_ReaxFF_ChenowethVanDuinGoddard_2008_CHO__SM_584143153761_001](https://openkim.org/id/Sim_LAMMPS_ReaxFF_ChenowethVanDuinGoddard_2008_CHO__SM_584143153761_001)

```
$ source kim-api-activate 
$ kim-api-collections-management install user Sim_LAMMPS_ReaxFF_ChenowethVanDuinGoddard_2008_CHO__SM_584143153761_001
```

![1593328174261](https://image.wanyijizi.com/20200628/1593328174261.png)

### 改写in文件

```
# KIM potential for CHO system
# .....

kim_init  Sim_LAMMPS_ReaxFF_ChenowethVanDuinGoddard_2008_CHO__SM_584143153761_001  real

read_data	data.CHO
kim_interactions H C O

neighbor	2 bin
neigh_modify	every 10 delay 0 check no

fix		1 all nve
fix             3 all temp/berendsen 500.0 500.0 100.0

timestep	0.25

#dump		1 all atom 30 dump.reax.cho

run		3000
```

![1593328480356](https://image.wanyijizi.com/20200628/1593328480356.png)

### 运行

![1593328870265](https://image.wanyijizi.com/20200628/1593328870265.png)