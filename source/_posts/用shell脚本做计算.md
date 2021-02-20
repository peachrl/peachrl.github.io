---
title: 用shell脚本做计算
date: 2020-10-10 10:27:12
updated: 2020-10-10 10:27:12
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Linux
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

因为一个困扰我好几天的问题最终发现只是单位换算错了，于是我“一怒之下”把它写成了脚本。
<!-- more -->

```shell
#!/bin/bash
#If we know the transitional energy, we know the transitional velocity.
#The kineti energy for an atom is mv^2/2.
#1kJ/mol = 1.0364e-2 eV.
#1m = 10^10\AA; 1s = 10^12ps.
#By peachrl

transitional_energy_in_eV=$1
transitional_energy="Transitional energy "
eV=" eV corresponds to velocity "
ms=" m/s, which equals to "

echo -e "${transitional_energy}${transitional_energy_in_eV}${eV}\c"

v=`bc <<- EOF
    scale = 5
    ans = sqrt(${transitional_energy_in_eV} * 2 * 1000 * 1000 / 1.0364 / 0.01 / 39.948)
    print ans
EOF
`

echo -e "${v}${ms}\c"

AAps=" \AA/ps."

bc <<- EOF
    scale = 5
    ans = ${v} * 10^10 / 10^12
    print ans
EOF

echo "${AAps}"
```

运行结果：

```shell
peachrl@peachrlPC:~$ ./tranEng2vel_eV2ms.sh 14.1
Transitional energy 14.1 eV corresponds to velocity 8253.02824 m/s, which equals to 82.53028 \AA/ps.
```

顺便强烈推荐一下《Linux命令行大全》这本书，初学读起来很舒服，节奏合理，易于食用，干货满满。以上脚本是看了2天书后的学习成果。