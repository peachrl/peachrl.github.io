---
title:  超算上安装lammps的步骤
date: 2021-11-22 16:43:01
updated: 2021-11-22 16:43:01
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- 超算
	- Slurm
	- lammps
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

仅针对**中国科技云·超算云：BSCC-A 超算系统**，网址为 https://scc.blsc.cn/

本来超算上有预装一些开源软件，比如 lammps，可以用 module 工具加载。我最近需要一个比较新版本的 lammps，在超算里用 `module avail` 命令找了找，只找到下面这一个：

```shell
source /public3/soft/modules/module.sh
module load lammps/intel17/lammps-31Aug2021-public3
```

可是我进到这个里面看了看，发现我需要的 reaxff 和 molecule 都没有装：

```shell
cd /public3/soft/lammps/intel17/lammps-31Aug2021
cd src/
make pi # lammps 查看已安装的 package 的命令
```

![bc54475dcabeda5fb67b19789394ecf4.png](https://image.wanyijizi.com/20211122/bc54475dcabeda5fb67b19789394ecf4.png)

只好自己装一个了。

<!-- more -->

## 安装步骤

```shell
source /public3/soft/modules/module.sh
module load mpi/intel/20.0.1-new-public3
tar -zxvf lammps-stable2021.tar.gz
cd lammps-stable2021/
cd src/
make yes-basic
make mpi -j 4
```

友情链接：如果是在自己的电脑 linux 系统安装 lammps，可以看[另一篇文](https://wanyijizi.com/2020/04/06/%E5%9C%A8Deepin%E7%B3%BB%E7%BB%9F%E5%AE%89%E8%A3%85LAMMPS%E7%9A%84%E8%AE%B0%E5%BD%95/)。

## 作业脚本 sub.sh

```shell
#!/bin/bash
#SBATCH -p amd_256
#SBATCH -N 1
source /public3/soft/modules/module.sh
module load mpi/intel/20.0.1-new-public3
export PATH=/public3/home/sc54074/peachrl/lammps-stable2021/src:$PATH
srun -n 64 lmp_mpi -in in.file
```

## 提交作业

```shell
sbatch sub.sh
```

其中 sub.sh 是你为作业脚本取的名字。

## 查看作业

### 查看当前帐号的作业运行状态

```shell
squeue
```

示例：

![51cb1a4d494511ce3163b91bfb55ba31.png](https://image.wanyijizi.com/20211122/51cb1a4d494511ce3163b91bfb55ba31.png)

### 查看更详细的作业信息（包括历史作业）

```shell
sacct -u sc12345 -S 2021-11-22 -E now --field=jobid,jobname,nnodes,start,end,elapsed,state
```

表示查询帐号 sc12345 在2021年11月22日至今所有作业，包括完成或未完成的，需要显示的信息有作业号、作业名、节点数、开始时间、结束时间、持续时长、当前状态。如下图：

![b23378c52682850c52e6034c8371fab2.png](https://image.wanyijizi.com/20211122/b23378c52682850c52e6034c8371fab2.png)

### 取消作业

```shell
scancel 3631557
```

其中 3631557 指的作业号 JOBID。

### 查看某帐号的储存情况

```shell
lfs quota -uh sc12345 ~
```

示例：

![6bca7978504b6e646464d3a837c66311.png](https://image.wanyijizi.com/20211122/6bca7978504b6e646464d3a837c66311.png)