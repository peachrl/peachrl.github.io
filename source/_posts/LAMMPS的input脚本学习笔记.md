---
title: LAMMPS的input脚本学习笔记
date: 2020-04-09 18:26:53
updated: 2020-04-09 18:26:53
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

## 语法

<!-- more -->

1. **LAMMPS按照顺序逐条执行命令，而不是全部读完文件后再执行**

---
2. **命令末尾出现&表示换行**

   在写命令中途可以使用：

```
dump		2 all image 100 image.*.jpg type type &
			zoom 1.6 adiam 1.5
```

​	和

```
dump		2 all image 100 image.*.jpg type type zoom 1.6 adiam 1.5
```

​	两段代码是一个意思，不过第二种写法要写在一行。

------

​	&在字符串内部使用，也表示换行：

```
variable a string "red green blue &
                purple orange cyan"
```

​	如果用的三个引号，那么不需要&就可以换行：

```
print """
System volume = $v
System temperature = $t
"""
```
---

3. **#表示注释，不过在引号里的#不算**

---
4. **\$：用varialbe 定义的变量，在下面引用变量的值时就要使用\${}**

  ${变量名}，如果变量名是单个字母，大括号可以省略。例如：

  ```
  variable X equal (xlo+xhi)/2+sqrt(v_area)
  region 1 block $X 2 INF INF EDGE EDGE
  variable X delete
  ```

  	$(表达式)，表达式视为临时变量，一般是个公式。例：

```
region 1 block $((xlo+xhi)/2+sqrt(v_area)) 2 INF INF EDGE EDGE
```

​	又例：

```
print "Final energy per atom: $(pe/atoms:%10.3f) eV/atom"
```

   ==注意：$不能嵌套。==

---
## 初始化

相关命令： [units](https://lammps.sandia.gov/doc/units.html)、[dimension](https://lammps.sandia.gov/doc/dimension.html)、[newton](https://lammps.sandia.gov/doc/newton.html)、[processors](https://lammps.sandia.gov/doc/processors.html)、[boundary](https://lammps.sandia.gov/doc/boundary.html) [atom_style](https://lammps.sandia.gov/doc/atom_style.html)、[atom_modify](https://lammps.sandia.gov/doc/atom_modify.html)

[pair_style](https://lammps.sandia.gov/doc/pair_style.html)、[bond_style](https://lammps.sandia.gov/doc/bond_style.html)、[angle_style](https://lammps.sandia.gov/doc/angle_style.html)、[dihedral_style](https://lammps.sandia.gov/doc/dihedral_style.html)、[improper_style](https://lammps.sandia.gov/doc/improper_style.html)

都是粒子或粒子间相互作用有关的信息

---
## 系统定义

相关命令：[read_data](https://lammps.sandia.gov/doc/read_data.html)、[read_restart](https://lammps.sandia.gov/doc/read_restart.html) 

[lattice](https://lammps.sandia.gov/doc/lattice.html), [region](https://lammps.sandia.gov/doc/region.html)、[create_box](https://lammps.sandia.gov/doc/create_box.html)、[create_atoms](https://lammps.sandia.gov/doc/create_atoms.html)、[read_dump](https://lammps.sandia.gov/doc/read_dump.html)

[replicate](https://lammps.sandia.gov/doc/replicate.html)

关于模拟的区域

---
## 模拟设置

力场系数（也可以写在read-in文件里）：[pair_coeff](https://lammps.sandia.gov/doc/pair_coeff.html)、[bond_coeff](https://lammps.sandia.gov/doc/bond_coeff.html)、[angle_coeff](https://lammps.sandia.gov/doc/angle_coeff.html)、[dihedral_coeff](https://lammps.sandia.gov/doc/dihedral_coeff.html)、[improper_coeff](https://lammps.sandia.gov/doc/improper_coeff.html)、[kspace_style](https://lammps.sandia.gov/doc/kspace_style.html)、[dielectric](https://lammps.sandia.gov/doc/dielectric.html)、[special_bonds](https://lammps.sandia.gov/doc/special_bonds.html)

模拟参数：[neighbor](https://lammps.sandia.gov/doc/neighbor.html)、[neigh_modify](https://lammps.sandia.gov/doc/neigh_modify.html)、[group](https://lammps.sandia.gov/doc/group.html)、[timestep](https://lammps.sandia.gov/doc/timestep.html)、[reset_timestep](https://lammps.sandia.gov/doc/reset_timestep.html)、[run_style](https://lammps.sandia.gov/doc/run_style.html)、[min_style](https://lammps.sandia.gov/doc/min_style.html)、[min_modify](https://lammps.sandia.gov/doc/min_modify.html)

计算指令：[compute](https://lammps.sandia.gov/doc/compute.html)、[compute_modify](https://lammps.sandia.gov/doc/compute_modify.html)、[variable](https://lammps.sandia.gov/doc/variable.html)

输出指令： [thermo](https://lammps.sandia.gov/doc/thermo.html)、[dump](https://lammps.sandia.gov/doc/dump.html)、[restart](https://lammps.sandia.gov/doc/restart.html)

---
## 运行

 [run](https://lammps.sandia.gov/doc/run.html)、[minimize](https://lammps.sandia.gov/doc/minimize.html)、[temper](https://lammps.sandia.gov/doc/temper.html)

