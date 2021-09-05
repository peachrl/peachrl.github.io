---
title: LAMMPS中dump image command和dump movie command
date: 2020-04-07 17:06:33
updated: 2020-04-07 17:06:33
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- LAMMPS
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

```
dump ID group-ID style N file color diameter keyword value ...
```

<!-- more -->

- ID：为这条dump指令起个名字
- group-ID：哪几组粒子将被导出
- style：image or movie
- N：每隔多少timesteps导出一张图
- file：导出的文件名
- color：由什么来区分粒子的颜色
  - 比如说type：
    - type 1 = red
    - type 2 = green
    - type 3 = blue
    - type 4 = yellow
    - type 5 = aqua
    - type 6 = cyan
    - 更多颜色就要由[dump_modify acolor](https://lammps.sandia.gov/doc/dump_modify.html) command来实现了
  - 再比如说vx：粒子在x方向的速度分量大小区间
- diameter：由什么来区分粒子的大小，比如type。默认所有type的粒子直径1.0，更多设置由[dump_modify adiam](https://lammps.sandia.gov/doc/dump_modify.html) command来实现
- keyword：其他设置，有atom、adiam、bond、line、tri、body、fix、size、view、center、up、zoom、persp、box、axes、subbox、shiny、ssao



## 举例

```
dump		2 all image 500 image.*.jpg type type &
		zoom 1.6 adiam 1.2
dump_modify	2 pad 5

dump		3 all movie 1 movie.avi type type &
		zoom 1.6 adiam 1.2
dump_modify	3 pad 5
```

- dump第2条指令：
  - all输出全部粒子
  - image导出图像格式
  - 每隔500时间步长
  - 导出的文件名为image.*.jpg
  - color=type由粒子的type区分颜色
  - diameter=type由粒子的type决定粒子直径
  - &换行
  - zoom缩放模拟框的大小
  - adiam重置直径数据
- dump_modify第2条指令：
  
  - pad文件名中的*是个5位数
  
    

<div align=center><img src="https://image.wanyijizi.com/20200407/image.00000.jpg" alt="image.00000" style="zoom:80%;" />

<div align=center><img src="https://image.wanyijizi.com/20200407/image.10000.jpg" alt="image.10000" style="zoom:80%;" />
<div align=center><iframe src="https://player.bilibili.com/player.html?aid=370317864&bvid=BV1XZ4y1x79o&cid=181211939&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 512px; height: 512px; max-width: 100%"> </iframe>

