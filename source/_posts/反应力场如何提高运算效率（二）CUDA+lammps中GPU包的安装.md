---
title:  反应力场如何提高运算效率（二）CUDA+lammps中GPU包的安装
date: 2021-11-25 12:06:43
updated: 2021-11-25 12:06:43
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- 超算
	- Slurm
	- LAMMPS
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

上次说到反应力场的计算比较慢，在 lammps 中 ReaxFF 想要加速只能通过 KOKKOS 和 OMP。这还需要预先安装好的并行编译器。我们这一篇文就先说 Ubuntu 20.04.3 LTS 系统上如何安装和使用 NIVIDIA 的 CUDA。

<!-- more -->

# CUDA+lammps中GPU包的安装

我们在查看Kokkos包的安装时注意到几个前提：

1.  Kokkos requires using a compiler that supports the c++14 standard. （这个容易达到）
2.  To build with Kokkos support for NVIDIA GPUs, the NVIDIA CUDA toolkit software version 9.0 or later must be installed on your system. （这个桃子的小机器做不到，它的 GPU 是 AMD 的）
3.  To build with Kokkos the HIPCC compiler from the AMD ROCm software version 3.5 or later is required. （这个很不幸桃子的小机器也做不到，Deepin 系统并没有直接受到支持，需要伪装成 Ubuntu 系统才可以安装，但是桃子研究了研究感觉风险过大得不偿失）

所以，以下安装步骤是在实验室的小机器 Ubuntu 20.04.3 LTS 系统上进行的，GPU 是 NVIDIA 的。

## 首先安装 NVIDIA CUDA toolkit

以下步骤参考一些网友的博客以及 NVIDIA 官方的安装说明。

### 确认 GPU 是否支持 CUDA

![1ca7ac8b53d91399c93d736b53e7b07a.png](https://image.wanyijizi.com/20211125/71cc06f2c979491ba208fbfab1e23882.png)

Quadro 系列用于专业可视化（听起来仿佛比不上 Tesla 系列用于技术与科学计算？总之），到 NVIDIA [官网](https://developer.nvidia.com/zh-cn/cuda-gpus)查看我们的 GPU 是否满足要求，Quadro K620 确实在支持 CUDA 的列表中。

### 查看系统是否满足要求

Ubuntu 20.04.3 LTS 肯定是行的。

### 确认系统是否安装 gcc

![0d5ed96ae58de62ba402147d8e5482bf.png](https://image.wanyijizi.com/20211125/2ebb46a4b395492a9d8d63116f060c49.png)

### 确认系统内核符合要求：

![419b680c87f54544be2c546494b69f8c.png](https://image.wanyijizi.com/20211125/8dfde93a0d8a4872b7c61663fda65970.png)

### 选择安装方式

现在可以开始 CUDA 了。CUDA 有多种安装方法，我们这里选择 runfile 方式进行安装（这里参考了[一位网友博客](https://www.cnblogs.com/booturbo/p/13960935.html)里推荐用这个方法的）。

### 停用 Nouveau

查看 Nouveau 驱动，发现正在运行：

![f91cadeeeeeecfe5b89328ca2a9f74a8.png](https://image.wanyijizi.com/20211125/2ba42ef4d3f74bc5b8bcaae9c5b37187.png)

创建 /etc/modprobe.d/blacklist-nouveau.conf 文件并写上以下两行：

```
blacklist nouveau
options nouveau modeset=0
```

然后运行以下命令：

![1e1407981f7f18268a622f311d3cd333.png](https://image.wanyijizi.com/20211125/a96dceb117e84bf1b5bf7893e2f5a26b.png)

然后重启。

### 下载 CUDA

```
wget https://developer.download.nvidia.com/compute/cuda/11.5.1/local_installers/cuda_11.5.1_495.29.05_linux.run
```

### 安装 CUDA

```
sudo sh cuda_11.5.1_495.29.05_linux.run
```

这个命令要等好久才有反应（不过也可能是这个机器 28 个核被师兄占了 26 个计算的原因？），然后问是否接受上面的条款：

![68038216d747e679ff5424a7c55c8a82.png](https://image.wanyijizi.com/20211125/5aaf81a8132146ada3261370b5c1d040.png)

当然 accept，

![3af2da26f55189ae0d96fed9854b3771.png](https://image.wanyijizi.com/20211125/9935eeca6b3e405eba6b449f709837d1.png)

接下来 Install

如果没有报错就可以直接进行下一项了。

不过，如果你和我遇到一样的情况的话：

![53480f1a9772bdba014f66a077b2cc7f.png](https://image.wanyijizi.com/20211125/64b4701f4e82426996c57d7869a130eb.png)

报错说驱动装不上，可能的原因是停用 Nouveau 后没有重启。

如果还有其他可能，可以手动重装一下驱动，参考[网友博文1](https://www.cnblogs.com/chua-n/p/13208398.html)和[博文2](https://www.cnblogs.com/chua-n/p/13208414.html)。

#### 插播掉坑记录

因为之前疏忽了没有重启，而且也没有意识到停用 Nouveau 之后重启的必要性，所以按照上面提到的博文操作了以下手动安装驱动的流程。

##### 下载对应 GPU 型号的驱动

网址：https://www.nvidia.cn/Download/index.aspx?lang=cn

没有桌面的话，可以在命令行由 wget 命令下载。

##### 卸载旧驱动

```
sudo apt-get --purge remove nvidia-*
```

##### 安装新驱动

```
sudo sh NVIDIA-Linux-x86_64-470.86.run
```

![8be1806700461cc2d45b3d3c74a4eec7.png](https://image.wanyijizi.com/20211125/4ebfae812ac544b3b1bcaa3e358eb170.png)

由于不太懂，先按照别人已成功的案例安装了再说，所以选 Continue installation，

![409743dee8daaacf4397f773a26db045.png](https://image.wanyijizi.com/20211125/6ebeb958a41f48f98bfc310e6e57cab2.png)

我找到了之前安装出错的真正原因，停用 Nouveau 后需要重启。。。

重启电脑，验证是否已禁用 nouveau：

![b5a9fe8b5043ffe0e2eda83a94fab20d.png](https://image.wanyijizi.com/20211125/c08ff7eee89b4657a40288ec8d9e617c.png)

什么也没有，成功停掉了。然后重新安装新驱动：

![bbbdad065b6e63f9ab32251f9b433a70.png](https://image.wanyijizi.com/20211125/de940b9ac7374e70acbf317cfbbcb909.png)

这回很顺利，下面全选yes（要看清楚有的默认选项是no）：

![69f3fc6d9dac6e6342b3fa25b4520471.png](https://image.wanyijizi.com/20211125/f20e4b7c9a08465ca40fb72c0c485b0d.png)

![b071b11ca1f97bdac472ecabaf97c56e.png](https://image.wanyijizi.com/20211125/cfe9bc28668f4690befd8fd455e69031.png)

![9f38e9d0470358915ccd43d74799b420.png](https://image.wanyijizi.com/20211125/552b0262cb024927a1ae34920a99a6bb.png)

##### 查看是否安装成功

![ad3a1cb16e5222e5094347f13cadbbfa.png](https://image.wanyijizi.com/20211125/326af8fb138146debd12db3137f247cf.png)

#### 终于安装成功

彻底删除旧的 CUDA，如果有的话：

```
sudo apt autoremove cuda
sudo apt --purge remove "*cublas*" "cuda*"
```

安装新的 CUDA：

![f480e000288f63e960ad9729a6d9d111.png](https://image.wanyijizi.com/20211125/0d890bca58a84f1fa8319885ea4f018b.png)

搞定！

### 添加 path

按照上图的提示在 ~/.bashrc 添加路径：

```
export PATH=$PATH:/usr/local/cuda-11.5/bin
export LD_LIBRARY_PATH=/usr/local/cuda-11.5/lib64
```

刷新一下：

```
source ~/.bashrc
```

### 检查是否安装完成

![23676246ac530c1097289ed8e3431d1c.png](https://image.wanyijizi.com/20211125/3e59183acede406eb175d53fa49887dd.png)

大功告成～～

## 再在 lammps 中安装 GPU 包

### lib/gpu 目录下首先编译 GPU library

修改文件 Makefile.linux：

```
CUDA_HOME = /usr/local/cuda-11.5
CUDA_ARCH = -arch=sm_50
```

上面一行是 CUDA 的路径。下面的 sm_50 是由 Compute Capability 决定的。NVIDIA [官网](https://developer.nvidia.com/zh-cn/cuda-gpus)上有一些类似下面这样的表格：

![feaef7de1790276de460d0a3e428b17d.png](https://image.wanyijizi.com/20211125/b71712c60ed54008a54650b25c10f934.png)

计算能力 7.5 就应该是sm_75。

其他项可以看情况改，比如 CUDA_PRECISION 决定了 GPU 计算的精度。

更改完执行：

```
make -f Makefile.linux -j 24
```

如果再次修改，则编译前还需执行 `make -f Makefile.linux clean`。

如果有必要，还需要修改文件 Makefile.lammps.standard（Makefile.linux 最上面 EXTRAMAKE 的值）：

```
CUDA_HOME=/usr/local/cuda-11.5
```

### src 目录安装 GPU 包

```
make yes-gpu
```

如果安装后又重新编译了 GPU library，则这里需要先 `make no-gpu`然后再重新 `make yes-gpu`。

### 重新编译 lammps

```
make clean-all
make peachrl -j 24
```

### 试一试

```
mpirun -np 8 lmp_peachrl -in in.flow.couette
```

![8eca8d83f1c5402e82e0ae5a26dc6f83.png](https://image.wanyijizi.com/20211125/8eca8d83f1c5402e82e0ae5a26dc6f83.png)

```
mpirun -np 8 lmp_peachrl -sf gpu -pk gpu 1 -in in.flow.couette
```

![a677bbb0dc2e4c15a95640e49721d822.png](https://image.wanyijizi.com/20211125/a677bbb0dc2e4c15a95640e49721d822.png)

```
mpirun -np 8 lmp_peachrl -sf gpu -pk gpu 2 -in in.flow.couette
```

这回 error 了。

![0ce9a99e79174fbd84148b9d3d980b41.png](https://image.wanyijizi.com/20211125/0ce9a99e79174fbd84148b9d3d980b41.png)

大概是我们的这台小机器只能支持 1 块 GPU？而且，这 1 块 GPU 的加速还看起来非常地不给力，完全比不上没有 GPU 加速的效率，这可能是 lammps example 自带的 in.flow.couette 例子太简单了，完全没有必要用 GPU 来自讨苦吃。

## 总结

通过 GPU 包的成功安装，确认了 CUDA 已经装好，我们离反应力场的加速又进一步了。