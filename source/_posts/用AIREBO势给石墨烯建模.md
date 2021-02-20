---
title: 用airebo/morse势给石墨烯建模
date: 2020-04-29 19:37:51
updated: 2020-04-29 19:37:51
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

## 前提条件

LAMMPS+MANYBODY package

<!-- more -->

## data文件

来自examples→USER→phonon→4-Graphene→data.pos

```
# Graphene cell with dimension 10 x 10 x 1 and a = 2.522
       200  atoms
         1  atom types

 0.    25.22000000000000  xlo xhi
 0.    21.84116068344354  ylo yhi
-10.   10.00000000000000  zlo zhi
   12.61000000000000     0.00000000000000     0.00000000000000 xy xz yz

Atoms

1 1     0.00000000000000     0.00000000000000     0.00000000000000
2 1     1.26100000000000     0.72803868944812     0.00000000000000
3 1     2.52200000000000     0.00000000000000     0.00000000000000
4 1     3.78300000000000     0.72803868944812     0.00000000000000
5 1     5.04400000000000     0.00000000000000     0.00000000000000
6 1     6.30500000000000     0.72803868944812     0.00000000000000
7 1     7.56600000000000     0.00000000000000     0.00000000000000

......
```

## 势文件

来自examples→airebo→CH.airebo-m

注：airebo/morse势是AIREBO的变形，将其中LJ势部分改用Morse势。

```
# DATE: 2016-03-15 CONTRIBUTOR: T.C. O'Connor CITATION: O'Connor, Andzelm, Robbins,  J. Chem. Phys. 142, 024903 (2015)
# AIREBO-M of T.C. O'Connor, J.W. Andzelm, M.O. Robbins (2015)
# Citation: J. Chem. Phys. 142, 024903 (2015); http://dx.doi.org/10.1063/1.4905549 
# Based on AIREBO of S.J. Stuart, A.B. Tutein, J.A. Harrison (2000) 
# Citation: J. Chem. Phys. 112, 6472 (2000); http://dx.doi.org/10.1063/1.481208 

1.7      rcmin_CC 
1.3      rcmin_CH 
1.1      rcmin_HH 
2.0      rcmax_CC 
1.8      rcmax_CH 
1.7      rcmax_HH 
2.0      rcmaxp_CC 
1.6      rcmaxp_CH 
1.7      rcmaxp_HH 
0.1      smin 
2.0      Nmin 
3.0      Nmax 
3.2      NCmin 
3.7      NCmax 
0.3134602960832605     Q_CC 
0.3407757282257080     Q_CH 
0.370     Q_HH 
4.746539060659529    alpha_CC 
4.102549828548784    alpha_CH 

......
```

## input脚本

```
boundary     p p p #周期边界
units        metal #单位，具体见备注
atom_style   atomic #原子类型为默认值


read_data	 data.pos #读取data文件

mass		*   12.0107 #C原子质量

pair_style          airebo/morse 3.0 1 1 #势函数类型，3.0是截断半径；0/1表示打开或关闭Morse项；0/1表示打开或关闭扭转项，AIREBO势的各项见备注
pair_coeff          * * CH.airebo-m C #用到的势文件中的C


velocity            all create 300.0 761341 #针对所有原子，300温度，随机赋予速度

fix                 1 all nve #每一步更新组内原子的位置和速度。V是体积，E是能量，二者保持恒定。
timestep            0.0005 #步长

dump   2 all xyz 10 dump.airebom.xyz #输出记录化学体系结构的.xyz文件

run                 1000 #运行1000步
```

## 运行结果

<iframe src="https://player.bilibili.com/player.html?aid=752940447&bvid=BV16k4y1r7eh&cid=185315710&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 512px; height: 512px; max-width: 100%"> </iframe>

## 备注

### units单位：

> For style *metal*, these are the units:
>
> - mass = grams/mole
> - distance = Angstroms
> - time = picoseconds
> - energy = eV
> - velocity = Angstroms/picosecond
> - force = eV/Angstrom
> - torque = eV
> - temperature = Kelvin
> - pressure = bars
> - dynamic viscosity = Poise
> - charge = multiple of electron charge (1.0 is a proton)
> - dipole = charge*Angstroms
> - electric field = volts/Angstrom
> - density = gram/cm^dim

### AIREBO势的三个项：

$$
\begin{split}E & = \frac{1}{2} \sum_i \sum_{j \neq i}
\left[ E^{\text{REBO}}_{ij} + E^{\text{LJ}}_{ij} +
 \sum_{k \neq i,j} \sum_{l \neq i,j,k} E^{\text{TORSION}}_{kijl} \right] \\\end{split}
$$

