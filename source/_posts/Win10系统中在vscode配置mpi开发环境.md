---
title:  Win10系统中在vscode配置mpi开发环境
date: 2020-06-03 15:40:45
updated: 2020-06-03 15:40:45
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- VSCode
	- Windows
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

## 前提

已安装vscode
<!-- more -->

## 安装msmpi

### 下载地址

https://www.microsoft.com/en-us/download/details.aspx?id=100593

![image-20200603145823402.png](https://pic.downk.cc/item/5ed769f4c2a9a83be5630ec8.png)

两种安装包二选一即可。

### 安装提示

1. 打开cmd，输入

```shell
set MSMPI
```

2. 显示如下图，则说明安装成功。后面所有相关目录均为安装后set MSMPI显示的相关目录，会根据安装时选择的文件夹而不同。

![image-20200603150143671](https://pic.downk.cc/item/5ed769f4c2a9a83be5630ecb.png)

## 配置vscode

### 在.vscode文件夹中添加includePath

```json
"D:/Microsoft SDKs/MPI/Include"
```

![image-20200603150700159](https://pic.downk.cc/item/5ed769f4c2a9a83be5630ecd.png)

## 测试C++代码

### C++代码：

```c++
#include <stdint.h>
#include <mpi.h>

#include <iostream>

int main(int argc,char* argv[])
{
    int myid, numprocs;
    int  namelen;
    char processor_name[MPI_MAX_PROCESSOR_NAME];
    MPI_Init(&argc,&argv);
    MPI_Comm_rank(MPI_COMM_WORLD,&myid);
    MPI_Comm_size(MPI_COMM_WORLD,&numprocs);
    MPI_Get_processor_name(processor_name,&namelen);
    std::cout << "Hello World! Process "<< myid <<" of "<< numprocs <<" on "<< processor_name << std::endl;
    MPI_Finalize();
    return 0;
}
```



### 在终端中编译运行，结果如下图：

![image-20200603172554787](https://pic.downk.cc/item/5ed76ccac2a9a83be566863f.png)

## 附录

### 在终端中编译运行的命令：

1. 编译
C语言：

```powershell
gcc 源文件文件名 -o 可执行文件文件名 -fopenmp -l msmpi -L "D:\Microsoft SDKs\MPI\Lib\x64" -I "D:\Microsoft SDKs\MPI\Include"
```

C++：
```powdershell
g++ 源文件文件名 -o 可执行文件文件名 -fopenmp -l msmpi -L "D:\Microsoft SDKs\MPI\Lib\x64" -I \"D:\Microsoft SDKs\MPI\Include" 
```
2. 再执行：

```shell
mpiexec -n 进程数 可执行文件文件名
```

### 可配置Code Runner扩展（对于C/C++）：

1. 打开扩展设置：

![image-20200603151703517](https://pic.downk.cc/item/5ed769f4c2a9a83be5630ed2.png)

2. 找到Executor Map，在settings.json中编辑：

![image-20200603151828983](https://pic.downk.cc/item/5ed76a2ac2a9a83be56361ef.png)

3. 在“code-runner.executorMap”中添加：

![image-20200603151948873](https://pic.downk.cc/item/5ed76a2ac2a9a83be56361f1.png)

```json
"c": "cd $dir && gcc $fileName -o $fileNameWithoutExt -fopenmp -l msmpi -L \"D:\\Microsoft SDKs\\MPI\\Lib\\x64\" -I \"D:\\Microsoft SDKs\\MPI\\Include\" && mpiexec -n 4 $fileNameWithoutExt",
"cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt -fopenmp -l msmpi -L \"D:\\Microsoft SDKs\\MPI\\Lib\\x64\" -I \"D:\\Microsoft SDKs\\MPI\\Include\" && mpiexec -n 4 $fileNameWithoutExt",
```

上面最后的```mpiexec -n 4 $fileNameWithoutExt```中4是进程数，可自行设置。
