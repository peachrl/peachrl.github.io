---
title: LAMMPS中ReaxFF势有关的安装和运行
date: 2020-04-20 22:42:51
updated: 2020-04-20 22:42:51
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


- 进入/src，安装package：

```shell
make yes-USER-REAXC
```

<!-- more -->

可以make package-status命令查看安装情况：

```shell
peachrl@peachrl-PC:~/LAMMPS/lammps-3Mar20/src$ make package-status
...
Installed YES: package USER-REAXC
...
```

看到YES说明安装成功。

`注意：我在网上查找教程的时候很多都是说要先make lib-reax之类的，但是在lammps官网上显示USER-REAXC不需要lib：`

![lib-no！](https://image.wanyijizi.com/20200420/1587392033417.png)

`大概是lammps改版了？总之我的lammps是“3Mar20”版本的。`

- 之后，还是在/src目录，重新make ubuntu（

  [之前make过的](https://peachrl.github.io/2020/04/06/zai-deepin-xi-tong-an-zhuang-lammps-de-makefile.ubuntu/ )）：

  ```shell
  sudo make ubuntu -j4
  ```

- 移动和改个名：

  ```shell
  mv lmp_ubuntu /home/peachrl/LAMMPS/bin/lmp4.reaxc
  ```

  

- 尝试运行一下example里reax文件里FeOH3那个例子：

  ```shell
  peachrl@peachrl-PC:~/LAMMPS/bin/reax/FeOH3$ mpirun -np 2 lmp4.reaxc < in.FeOH3
  LAMMPS (3 Mar 2020)
  Reading data file ...
    orthogonal box = (0 0 0) to (25 25 25)
    1 by 1 by 2 MPI processor grid
    reading atoms ...
    105 atoms
    read_data CPU = 0.0673389 secs
  Reading potential file ffield.reax.Fe_O_C_H with DATE: 2011-02-18
  Neighbor list info ...
    update every 10 steps, delay 0 steps, check no
    max neighbors/atom: 2000, page size: 100000
    master list distance cutoff = 12
    ghost atom cutoff = 12
    binsize = 6, bins = 5 5 5
    2 neighbor lists, perpetual/occasional/extra = 2 0 0
    (1) pair reax/c, perpetual
        attributes: half, newton off, ghost
        pair build: half/bin/newtoff/ghost
        stencil: half/ghost/bin/3d/newtoff
        bin: standard
    (2) fix qeq/reax, perpetual, copy from (1)
        attributes: half, newton off, ghost
        pair build: copy
        stencil: none
        bin: none
  Setting up Verlet run ...
    Unit style    : real
    Current step  : 0
    Time step     : 0.25
  Per MPI rank memory allocation (min/avg/max) = 14.98 | 15.48 | 15.98 Mbytes
  Step Temp E_pair E_mol TotEng Press 
         0            0   -9715.3326            0   -9715.3326   -139.61126 
      3000    533.69756   -9637.8194            0   -9472.3709    146.07633 
  Loop time of 10.2791 on 2 procs for 3000 steps with 105 atoms
  
  Performance: 6.304 ns/day, 3.807 hours/ns, 291.855 timesteps/s
  92.8% CPU use with 2 MPI tasks x no OpenMP threads
  
  MPI task timing breakdown:
  Section |  min time  |  avg time  |  max time  |%varavg| %total
  ---------------------------------------------------------------
  Pair    | 8.8067     | 8.8202     | 8.8337     |   0.5 | 85.81
  Neigh   | 0.22447    | 0.23657    | 0.24867    |   2.5 |  2.30
  Comm    | 0.16772    | 0.18188    | 0.19605    |   3.3 |  1.77
  Output  | 3.4258e-05 | 4.9204e-05 | 6.4151e-05 |   0.0 |  0.00
  Modify  | 1.0178     | 1.0302     | 1.0426     |   1.2 | 10.02
  Other   |            | 0.01022    |            |       |  0.10
  
  Nlocal:    52.5 ave 64 max 41 min
  Histogram: 1 0 0 0 0 0 0 0 0 1
  Nghost:    511.5 ave 559 max 464 min
  Histogram: 1 0 0 0 0 0 0 0 0 1
  Neighs:    1976.5 ave 2428 max 1525 min
  Histogram: 1 0 0 0 0 0 0 0 0 1
  
  Total # of neighbors = 3953
  Ave neighs/atom = 37.6476
  Neighbor list builds = 300
  Dangerous builds not checked
  
  Please see the log.cite file for references relevant to this simulation
  
  Total wall time: 0:00:10
  
  ```

  