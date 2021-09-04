---
title: LAMMPS自带的Python工具试用记录
date: 2021-08-13 20:02:01
updated: 2021-08-13 20:02:01
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Python
	- LAMMPS
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: falset
---

<div class="success">

> 运行环境：deepin 20.2.2；python 3.7；lammps 30Jul2021

</div>

lammps安装包自带的python工具也在/home/peachrl/lammps/tools/python目录内，有：

- log2txt.py	convert thermo info in a LAMMPS log file to columns of numbers
- logplot.py	plot 2 columns of thermo info from a LAMMPS log file
- dumpsort.py	sort the snapshots of atoms in a LAMMPS dump file by atom ID
- dump2cfg.py	convert a native LAMMPS dump file to CFG format
- dump2xyz.py	convert a native LAMMPS dump file to XYZ format
- dump2pdb.py	convert a native LAMMPS dump file to PDB format
- neb_combine.py	combine multiple NEB dump files into one time series
- neb_final.py	combine multiple NEB final states into one sequence of states

不论是直接取用还是学习python进行后处理，都是非常不错的材料。

<!-- more -->

### 两种方式获得Pizza.py

#### 方式一：[下载Pizza.py的安装包](https://cs.sandia.gov/~sjplimp/download.html)

![image-20210813170748222](https://image.wanyijizi.com/20210813/image-20210813170748222.png)

解压并放到/home/peachrl/pizza目录下，其中的src文件夹在/home/peachrl/.bashrc中设置环境变量：

```shell
export LAMMPS_PYTHON_TOOLS="/home/peachrl/pizza/src"
```

#### 方式二：lammps安装包内的pizza文件夹

lammps安装包/home/peachrl/lammps/tools/python目录内有个pizza文件夹，包含lammps后处理所需的文件，直接在/home/peachrl/.bashrc中设置环境变量：

```shell
export LAMMPS_PYTHON_TOOLS="/home/peachrl/lammps/tools/python/pizza"
```

### log2txt.py

将需要处理的log文件（比如下图的log.lammps）和log2txt.py放在同一文件夹（当然也可以不放同一文件夹，写清楚路径也行）：

![image-20210813181306806](https://image.wanyijizi.com/20210813/image-20210813181306806.png)

在终端运行：

```shell
python log2txt.py log.lammps txt.lammps
```

即可得到全部数据的提取：

![image-20210813184856077](https://image.wanyijizi.com/20210813/image-20210813184856077.png)

若在终端运行：

```shell
python log2txt.py log.lammps txt.lammps Press
```

则提取的是Press这一列下所有数据：

![image-20210813185132227](https://image.wanyijizi.com/20210813/image-20210813185132227.png)

### logplot.py

需要先安装GnuPlot：

```shell
sudo apt-get install gnuplot
```

将需要处理的log文件（前文的log.lammps）和logplot.py放在同一文件夹，在终端运行：

```shell
python -i logplot.py log.lammps Time Press
```

得到以Time为X轴，Press为Y轴的图像：

![image-20210813190815856](https://image.wanyijizi.com/20210813/image-20210813190815856.png)

此时终端会停留在python里：

![image-20210813194317562](https://image.wanyijizi.com/20210813/image-20210813194317562.png)

如果需要保存成png格式的图片，可以继续输入：

```python
>>> g('set term png')
>>> g('set output "Time-Press.png"')
>>> g.plot(x,y)
```

文件夹里就会出现已保存的文件。

![image-20210813194535719](https://image.wanyijizi.com/20210813/image-20210813194535719.png)

### dumpsort.py

通过dump命令输出如下图所示的文件：

![image-20210813195451445](https://image.wanyijizi.com/20210813/image-20210813195451445.png)

与dumpsort.py放于同一文件夹内，在终端运行：

```shell
python dumpsort.py 265.txt 1 new265.txt
```

得到：

![image-20210813195708669](https://image.wanyijizi.com/20210813/image-20210813195708669.png)

也就是按照命令中所输入的“1”（指`ITEM:ATOM`下面的第1列）进行从小到大排序。
