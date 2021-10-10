---
title: 在Python中调用Julia函数
date: 2021-10-10 22:36:30
updated: 2021-10-10 22:36:30
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Julia
	- Python
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

> 运行环境：Win11，Python 3.8.5，Julia 1.5.3

</div>

没用过Julia语言的话..简介及安装步骤见[另一篇文](https://wanyijizi.com/2020/07/21/Julia%E5%9C%A8win10%E7%8E%AF%E5%A2%83%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E8%A7%A3%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%E7%9A%84%E4%BE%8B%E5%AD%90/)。

<!-- more -->

话说，博主桃超级开心在10月5日顺利装备上了Win11，虽然除了界面变得像果冻了一些，并没有感觉到很大差别🤣。

总之今天是第一篇建立在Win11环境上的博文啦~以后应该再不会有运行环境为Win10的文出现了😁

今日份的文起源是无聊(×)的我在找一个复杂又无聊的函数的极小值点的时候突发奇想要用Julia语言写，确实也写出来了：

```Julia
using Optim
using Printf
using Plots
using IntervalArithmetic, TaylorModels

a = 5
b = 5
n = 5

function U(h)
    u = zeros(Float64,n)
    for i = -a:a
        for j = -b:b
            for k = 0:n-1
                u[k+1] += 4 * 0.128736 * (3^12 * (2.773^2 * (i^2 + j^2 + i*j) + (h + k*2.26)^2)^(-6) - 3^6 * (2.773^2 * (i^2 + j^2 + i*j) + (h + k*2.26)^2)^(-3))
            end
        end
    end
    return sum(u)
end

res = optimize(U, 0.0, 12.5)
Printf.@printf "极小值点 %.2f\n" Optim.minimizer(res)
Printf.@printf "极小值 %.2f\n" Optim.minimum(res)

############## 画图 #############
#=
h = range(0.0,stop=12.5,step=0.001)
PES = Plots.plot(h,U.(h),xlims=(0,12.5),ylims=(-2,10),size=(1000,600),lw=5,lab="Potential-energy-curve at S-site",dpi=300,axis = font(20),legendfont=(20))
y = 0
Plots.hline!([0],ls=:dash,lw=3,lab="")
Plots.scatter!([Optim.minimizer(res)], [U(Optim.minimizer(res))], lab="",ms=10)
Plots.savefig(PES, "PES.png")
=#
```

就是上面这个U(h)，但是我其他处理数据的代码都是Python写的。现在想要调用U了，我还得在Python里面再输入一遍。。这怎么能行？重复劳动没前途，于是继续又开发了一下在Python中调用Julia函数的技能。

步骤很简单（所以我前面水了一堆废话）：

1. 命令行`pip3 install julia`
2. Julia REPL，先输入`]`，进入pkg>模式，输入`add PyCall`
3. Python REPL>>>`julia.install()`

然后Julia和Python就成功在一起啦！

在Python脚本调用test.jl文件中U(h)函数的方法：

```python
from julia import Main

Main.include("test.jl")
print(Main.U(5))
```

