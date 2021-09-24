---
title: 在Deepin系统安装LAMMPS的记录
date: 2020-04-06 15:27:38
updated: 2021-09-24 18:08:19
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

> 本记录最后一次修整在2021年9月24日，系统为`Deepin 20.2.3`，安装lammps的版本为`20 Sep 2021`，只适用类似Ubuntu的系统。

</div>

<!-- more -->

## 安装之前

1. sudo apt-get install gcc

2. sudo apt-get install g++

3. sudo apt-get install gfortran

4. 可能还有mpi-default-bin, mpi-default-dev,libfftw3-dev, libjpeg-dev and libpng12-dev这些，总之make的时候差什么补什么。具体可以参考/src/MAKE/MACHINES/Makefile.ubuntu里的注释：

```
# you have to install the packages g++, mpi-default-bin, mpi-default-dev,
# libfftw3-dev, libjpeg-dev and libpng12-dev to compile LAMMPS with this
```

<div class="success">

> **注1：**如果安装过程提示 fatal error: png.h: No such file or directory，则先`sudo apt-get install libpng-dev`  
>
> **注2：**如果安装过程提示 makeinfo is missing on your system，可以先`sudo apt-get install texinfo`

</div>

## 准备安装包

查看/src/MAKE/MACHINES/Makefile.ubuntu里的注释，有：

```
# ubuntu = Ubuntu Linux box, g++, openmpi, FFTW3
```

因此准备安装包：fftw3、lammps、openmpi（openmpi和mpich2功能相似）

<div class="success">

>**注3：**2021年9月24日安装最新的lammps时发现，如果[安装之前](#安装之前)中提到的项目都安装了，openmpi和fftw3应该不用手动安装，但如果报错的话就还是自己手动安装吧。
>
>**注4：**通过官网教程上给出的命令从github下载lammps源码出错：
>
>```shell
$ git clone -b unstable https://github.com/lammps/lammps.git mylammps
fatal: unable to access 'https://github.com/lammps/lammps.git/': gnutls_handshake() failed: The TLS connection was non-properly terminated.
>```
>
>网上都说是代理的问题，但是我新装的系统根本没有设置什么代理。尝试了下面的取消代理命令：
>
>```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
>```
>
>果然没有效果。后来将https改为http就能成功下载了：
>
>```shell
git clone -b unstable http://github.com/lammps/lammps.git mylammps
>```
>
>具体原因不知。

</div>

## 安装的时候注意路径
### 安装：

以下都是用的lammps的默认路径，为了make的时候方便。可以查看\lammps\src\MAKE\OPTIONS 路径下Makefile.fftw 文件和Makefile.g++\_openmpi_link文件里的路径。

1. （如果直接安装lammps报错就手动安装一下）fftw：（-j4 指调用4核编译）
```shell
sudo ./configure --prefix=/usr/local --enable-float
sudo make -j4
sudo make install
```
2. （如果直接安装lammps报错就手动安装一下）openmpi：
```shell
sudo ./configure --prefix=/usr/local
sudo make -j4
sudo make install
```
3. 将/src/MAKE/MACHINES/Makefile.ubuntu复制到/src/MAKE/目录下。在/src目录下：
```shell
sudo make ubuntu -j4
```
### 如果不成功，有时候是library没有立即生效，用

```shell
ldconfig
```

进行更新。

### 检查安装路径可以用语句：

```shell
whereis openmpi
```



## 为了简化操作，设置环境变量

### 在主目录的隐藏文件.bashrc里编辑：

```
export PATH="$PATH:/home/peachrl/LAMMPS/bin"
export PATH=/usr/local/bin:$PATH
```

两种写法好像都行。然后，

```shell
source ~/.bashrc
```

让它生效。

### 看是否成功用语句：

```shell
which lmp_ubuntu
```


## 运行

运行前移动和改名了：

```shell
mv /src/lmp_ubuntu /home/peachrl/LAMMPS/bin/lmp4
```

运行：（3 指调用3核）

```shell
cd /home/peachrl/LAMMPS/lammps-3Mar20/examples/flow
mpirun -np 3 lmp4 < in.flow.couette
```


## 附录

### Makefile.ubuntu

```
# ubuntu = Ubuntu Linux box, g++, openmpi, FFTW3

# you have to install the packages g++, mpi-default-bin, mpi-default-dev,
# libfftw3-dev, libjpeg-dev and libpng12-dev to compile LAMMPS with this
# makefile

SHELL = /bin/sh

# ---------------------------------------------------------------------
# compiler/linker settings
# specify flags and libraries needed for your compiler

CC =		mpic++
CCFLAGS =	-g -O3 # -Wunused
SHFLAGS =	-fPIC
DEPFLAGS =	-M

LINK =		mpic++
LINKFLAGS =	-g -O3
LIB = 
SIZE =		size

ARCHIVE =	ar
ARFLAGS =	-rc
SHLIBFLAGS =	-shared

# ---------------------------------------------------------------------
# LAMMPS-specific settings, all OPTIONAL
# specify settings for LAMMPS features you will use
# if you change any -D setting, do full re-compile after "make clean"

# LAMMPS ifdef settings
# see possible settings in Section 2.2 (step 4) of manual

LMP_INC =	-DLAMMPS_GZIP -DLAMMPS_JPEG -DLAMMPS_PNG -DLAMMPS_FFMPEG

# MPI library
# see discussion in Section 2.2 (step 5) of manual
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
# see discussion in Section 2.2 (step 6) of manaul
# can be left blank to use provided KISS FFT library
# INC = -DFFT setting, e.g. -DFFT_FFTW, FFT compiler settings
# PATH = path for FFT library
# LIB = name of FFT library

FFT_INC =    	-DFFT_FFTW3
FFT_PATH = 
FFT_LIB = -lfftw3

# JPEG and/or PNG library
# see discussion in Section 2.2 (step 7) of manual
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

include	Makefile.package.settings
include	Makefile.package

EXTRA_INC = $(LMP_INC) $(PKG_INC) $(MPI_INC) $(FFT_INC) $(JPG_INC) $(PKG_SYSINC)
EXTRA_PATH = $(PKG_PATH) $(MPI_PATH) $(FFT_PATH) $(JPG_PATH) $(PKG_SYSPATH)
EXTRA_LIB = $(PKG_LIB) $(MPI_LIB) $(FFT_LIB) $(JPG_LIB) $(PKG_SYSLIB)
EXTRA_CPP_DEPENDS = $(PKG_CPP_DEPENDS)
EXTRA_LINK_DEPENDS = $(PKG_LINK_DEPENDS)

# Path to src files

vpath %.cpp ..
vpath %.h ..

# Link target

$(EXE):	$(OBJ) $(EXTRA_LINK_DEPENDS)
	$(LINK) $(LINKFLAGS) $(EXTRA_PATH) $(OBJ) $(EXTRA_LIB) $(LIB) -o $(EXE)
	$(SIZE) $(EXE)

# Library targets

lib:	$(OBJ) $(EXTRA_LINK_DEPENDS)
	$(ARCHIVE) $(ARFLAGS) $(EXE) $(OBJ)

shlib:	$(OBJ) $(EXTRA_LINK_DEPENDS)
	$(CC) $(CCFLAGS) $(SHFLAGS) $(SHLIBFLAGS) $(EXTRA_PATH) -o $(EXE) \
        $(OBJ) $(EXTRA_LIB) $(LIB)

# Compilation rules

%.o:%.cpp $(EXTRA_CPP_DEPENDS)
	$(CC) $(CCFLAGS) $(SHFLAGS) $(EXTRA_INC) -c $<

%.d:%.cpp $(EXTRA_CPP_DEPENDS)
	$(CC) $(CCFLAGS) $(EXTRA_INC) $(DEPFLAGS) $< > $@

%.o:%.cu $(EXTRA_CPP_DEPENDS)
	$(CC) $(CCFLAGS) $(SHFLAGS) $(EXTRA_INC) -c $<

# Individual dependencies

depend : fastdep.exe $(SRC)
	@./fastdep.exe $(EXTRA_INC) -- $^ > .depend || exit 1

fastdep.exe: ../DEPEND/fastdep.c
	cc -O -o $@ $<

sinclude .depend
```

### Makefile.fftw

```
FFT_INC =    	-DFFT_FFTW3 -I/usr/local/include
FFT_PATH =      -L/usr/local/lib
FFT_LIB =	-lfftw3
```

### Makefile.g++_openmpi_link

```
MPI_INC =       -DMPICH_SKIP_MPICXX -DOMPI_SKIP_MPICXX=1 -I/usr/local/include
MPI_PATH = 	-L/usr/local/lib
MPI_LIB =	-lmpi -lmpi_cxx
```



