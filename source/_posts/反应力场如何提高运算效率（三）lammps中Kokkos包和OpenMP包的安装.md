---
title:  反应力场如何提高运算效率（三）lammps中Kokkos包和OpenMP包的安装
date: 2021-11-26 17:12:13
updated: 2021-11-26 17:12:13
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

上次CUDA 已经装好，今天我们就要正式在 lammps 中 加装 KOKKOS 包和 OMP 包。

<!-- more -->

## 安装 Kokkos 包

这个在 lammps 中非常简单：

```shell
make yes-kokkos
```

但是 lammps 的编译则需要注意，Makefile 里需要修改和添加一些值：

```makefile
……
KOKKOS_ABSOLUTE_PATH = $(shell cd $(KOKKOS_PATH); pwd)
export OMPI_CXX = $(KOKKOS_ABSOLUTE_PATH)/bin/nvcc_wrapper
……
KOKKOS_DEVICES = Cuda
# HOSTARCH = HOST from list above that is hosting the GPU  
# GPUARCH = GPU from list above
KOKKOS_ARCH = BDW,MAXWELL50  
KOKKOS_CUDA_OPTIONS = "enable_lambda"
……
```

其中第二行 nvcc\_wrapper 在哪儿你可以在 /lib/kokkos 里找找。第六行 KOKKOS\_ARCH 的两个值分别是上面注释的 HOSTARCH 和 GPUARCH。

HOSTARCH 参见[网址](https://ark.intel.com/content/www/us/en/ark.html#@Processors)，选则自己机器的型号：

![29ef697826e080bae28c868b92e15c89.png](https://image.wanyijizi.com/20211126/2cbd4f073128458c9198b7a74eb2f8c4.png)

![c469e5f6f11db69b24428abc7fd25363.png](https://image.wanyijizi.com/20211126/bd2ead8614664b24ae3ce343104b0244.png)

具体呢，我查看了上面圈出来的两处，对应了 [lammps 官网列表](https://docs.lammps.org/Build_extras.html#kokkos)里的 BDW：

![44a52cd1af3325f0640dcf76b97c3660.png](https://image.wanyijizi.com/20211126/bdb038e0916446ccbfa7d9388a383635.png)

至于 GPUARCH 为什么选 MAXWELL50…我猜的。我猜后两位数字表示 GPU 的计算能力，就和[前一篇文](https://wanyijizi.com/2021/11/25/%E5%8F%8D%E5%BA%94%E5%8A%9B%E5%9C%BA%E5%A6%82%E4%BD%95%E6%8F%90%E9%AB%98%E8%BF%90%E7%AE%97%E6%95%88%E7%8E%87%EF%BC%88%E4%BA%8C%EF%BC%89CUDA+lammps%E4%B8%ADGPU%E5%8C%85%E7%9A%84%E5%AE%89%E8%A3%85/)里面的 sm_50 一样看着数字选就行。

将新写的 Makefile.peachrl 放在 /src/MAKE 目录下，然后回到 /src 并运行以下命令进行编译：

```shell
make peachrl -j 24
```

还是先用 lammps example 自带的 in.flow.couette 例子试一试：

```shell
mpirun -np 24 lmp_peachrl -k on g 1 -sf kk -in in.flow.couette
```

![f60de6859bf174f5a950e07b538c2ebb.png](https://image.wanyijizi.com/20211126/c53a5898e46d4a0e9e01873b4f8e6642.png)

跑通了，就是比 GPU 包的加速更慢了。

## 安装 OpenMP 包

反应力场本就只有唯二两种加速方式，除了上文的 Kokkos，另一个可以加速的包是 OpenMP。同样是：

```shell
make yes-openmp
```

同样是Makefile 里需要修改和添加一些值：

```makefile
CCFLAGS =	-g -O3 -fopenmp
SHFLAGS =	-fPIC
DEPFLAGS =	-M

LINK =		mpicxx
LINKFLAGS =	-g -O -fopenmp
```

还是先用 lammps example 自带的 in.flow.couette 例子试一试：

```shell
mpirun -np 24 lmp_peachrl -sf omp -pk omp 4 -in in.flow.couette
```

![d93a52e1bfa311d637fc1e928408e342.png](https://image.wanyijizi.com/20211126/d94bc87d05c845998a02a20a044d5bf3.png)

成了！（~~更慢了更慢了，我都不知道我到底在研究加速还是减速了。~~）OpenMP 慎用，线程数太多不一定好。

## OpenMP + Kokkos

Kokkos 是可以和 OpenMP 一起配合使用的，调整 Makefile 如下：

```makefile
# ubuntu = Ubuntu Linux box, g++, openmpi, FFTW3

# you have to install the packages g++, mpi-default-bin, mpi-default-dev,
# libfftw3-dev, libjpeg-dev and libpng12-dev to compile LAMMPS with this
# makefile

SHELL = /bin/sh

# ---------------------------------------------------------------------
# compiler/linker settings
# specify flags and libraries needed for your compiler

KOKKOS_ABSOLUTE_PATH = $(shell cd $(KOKKOS_PATH); pwd)
export OMPI_CXX = $(KOKKOS_ABSOLUTE_PATH)/bin/nvcc_wrapper
CC =		mpicxx
CCFLAGS =	-g -O3 -fopenmp
SHFLAGS =	-fPIC
DEPFLAGS =	-M

LINK =		mpicxx
LINKFLAGS =	-g -O -fopenmp
LIB = 
SIZE =		size

ARCHIVE =	ar
ARFLAGS =	-rc
SHLIBFLAGS =	-shared
KOKKOS_DEVICES = Cuda,OpenMP
# KOKKOS_ARCH = MAXWELL50
KOKKOS_ARCH = BDW,MAXWELL50  # HOSTARCH = HOST from list above that is hosting the GPU  # GPUARCH = GPU from list above
KOKKOS_CUDA_OPTIONS = "enable_lambda"

# ---------------------------------------------------------------------
# LAMMPS-specific settings, all OPTIONAL
# specify settings for LAMMPS features you will use
# if you change any -D setting, do full re-compile after "make clean"

# LAMMPS ifdef settings
# see possible settings in Section 3.5 of the manual

LMP_INC =	-DLAMMPS_GZIP -DLAMMPS_JPEG -DLAMMPS_PNG -DLAMMPS_FFMPEG

# MPI library
# see discussion in Section 3.4 of the manual
# MPI wrapper compiler/linker can provide this info
# can point to dummy MPI library in src/STUBS as in Makefile.serial
# use -D MPICH and OMPI settings in INC to avoid C++ lib conflicts
# INC = path for mpi.h, MPI compiler settings
# PATH = path for MPI library
# LIB = name of MPI library

MPI_INC =
MPI_PATH = 
MPI_LIB =

# FFT library
# see discussion in Section 3.5.2 of manual
# can be left blank to use provided KISS FFT library
# INC = -DFFT setting, e.g. -DFFT_FFTW, FFT compiler settings
# PATH = path for FFT library
# LIB = name of FFT library

FFT_INC =    	-DFFT_FFTW3
FFT_PATH = 
FFT_LIB = -lfftw3

# JPEG and/or PNG library
# see discussion in Section 3.5.4 of manual
# only needed if -DLAMMPS_JPEG or -DLAMMPS_PNG listed with LMP_INC
# INC = path(s) for jpeglib.h and/or png.h
# PATH = path(s) for JPEG library and/or PNG library
# LIB = name(s) of JPEG library and/or PNG library

JPG_INC =       
JPG_PATH = 	
JPG_LIB = -ljpeg -lpng

# ---------------------------------------------------------------------
# build rules and dependencies
# do not edit this section

include Makefile.package.settings
include Makefile.package

EXTRA_INC = $(LMP_INC) $(PKG_INC) $(MPI_INC) $(FFT_INC) $(JPG_INC) $(PKG_SYSINC)
EXTRA_PATH = $(PKG_PATH) $(MPI_PATH) $(FFT_PATH) $(JPG_PATH) $(PKG_SYSPATH)
EXTRA_LIB = $(PKG_LIB) $(MPI_LIB) $(FFT_LIB) $(JPG_LIB) $(PKG_SYSLIB)
EXTRA_CPP_DEPENDS = $(PKG_CPP_DEPENDS)
EXTRA_LINK_DEPENDS = $(PKG_LINK_DEPENDS)

# Path to src files

vpath %.cpp ..
vpath %.h ..

# Link target

$(EXE): main.o $(LMPLIB) $(EXTRA_LINK_DEPENDS)
	$(LINK) $(LINKFLAGS) main.o $(EXTRA_PATH) $(LMPLINK) $(EXTRA_LIB) $(LIB) -o $@
	$(SIZE) $@

# Library targets

$(ARLIB): $(OBJ) $(EXTRA_LINK_DEPENDS)
	@rm -f ../$(ARLIB)
	$(ARCHIVE) $(ARFLAGS) ../$(ARLIB) $(OBJ)
	@rm -f $(ARLIB)
	@ln -s ../$(ARLIB) $(ARLIB)

$(SHLIB): $(OBJ) $(EXTRA_LINK_DEPENDS)
	$(CC) $(CCFLAGS) $(SHFLAGS) $(SHLIBFLAGS) $(EXTRA_PATH) -o ../$(SHLIB) \
		$(OBJ) $(EXTRA_LIB) $(LIB)
	@rm -f $(SHLIB)
	@ln -s ../$(SHLIB) $(SHLIB)

# Compilation rules

%.o:%.cpp
	$(CC) $(CCFLAGS) $(SHFLAGS) $(EXTRA_INC) -c $<

# Individual dependencies

depend : fastdep.exe $(SRC)
	@./fastdep.exe $(EXTRA_INC) -- $^ > .depend || exit 1

fastdep.exe: ../DEPEND/fastdep.c
	cc -O -o $@ $<

sinclude .depend
```

lammps example 自带的 in.flow.couette 例子，24 MPI tasks/node，1 GPUs/node，8 OpenMP threads/task：

```shell
mpirun -np 24 lmp_peachrl -k on g 1 t 2 -sf kk -in in.flow.couette
```

>### 线程数、GPU数都应该怎么设置  
>  
>一般来说要求：  
>  
>- (number of MPI tasks) * (OpenMP threads per task) <= (total number of physical cores per node)  
>- 超线程：(number of MPI tasks) * (OpenMP threads per task) <= (total number of virtual cores per node)  
>  
>超线程可能会报警：  
>  
>![3a7784b6d1060de02afd0797ba4a5313.png](https://image.wanyijizi.com/20211126/c0ffdea161264c12870201318912512c.png)

最终结果：

![7b717cfcbb23a0f95b1235af7fcfbd8b.png](https://image.wanyijizi.com/20211126/751115500a0643fca300a950f0e80a14.png)