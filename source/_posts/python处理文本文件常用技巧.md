---
title: Python处理文本文件常用技巧
date: 2021-08-01 08:57:22
updated: 2021-08-01 08:57:22
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Python
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: falset
---

1. 提取文件夹中所有.txt文件路径并按文件名排序
2. 截取.txt文件中的部分内容
3. 导出.csv文件
4. 读取.csv文件并画图

<!-- more -->

LAMMPS具有非常强大完备的分子动力学模拟功能，相对的，其前后处理则较为薄弱。因此，我们在这里寻求用python进行后处理的方法。由命令

```
dump                    data allinAtom custom 10 Ar.${loop}.txt mol type x y z vx vy vz
```

从LAMMPS中输出了如下图所示的一系列txt文件，如何提取其中的数据并绘制成图像呢？

![image-20210806000550332](https://pic.imgdb.cn/item/610c206d5132923bf8e315d8.png)

以下很多内容也是在网上百度学来，已经不清楚出处了。

## 提取文件夹中所有.txt文件路径并按文件名排序

```python
import os
import re

filter=[".txt"]

def sort_only_number(a_list):
    ans_list = []
    list_dic = {}
    for item in a_list:
        if os.path.splitext(item)[1] in filter:
            item_num = re.sub(r'\D*', '', item)
            if item_num != '':
                list_dic[int(item_num)] = item
    for i in sorted(list_dic):
        ans_list.append(list_dic[i])
    return ans_list

def all_path(dirname):
    result = []
    for maindir, subdir, file_name_list in os.walk(dirname):
        for filename in sort_only_number(file_name_list):
            apath = os.path.join(maindir, filename) 
            
            ext = os.path.splitext(apath)[1]
            if ext in filter:
                result.append(apath)
        break
    return result

data_path = all_path(".")
```

- 第一行的`filter=[".txt"]`相当于设置一个文件后缀名过滤器，后面配合os.path.splitext()函数就能看到作用。

- 接下来自定义一个sort_only_number()函数，针对一个列表结构的一系列文件路径，按照文件名中的数字进行排序，并以列表结构输出。
  - 其中os.path.splitext()函数会对文件路径进行切割，分成（路径无后缀名，后缀名）这样的元组，os.path.splitext()[0]和[1]能够分别表示该元组的前后项。由此配合前面的设定可以筛选出txt格式的文件。
  - 之后的re.sub()通过正则表达式提取文件路径中的数字（其实是删除了非数字的内容），再由sorted()函数进行排序。

- 自定义的第二个函数all_path()是将指定的文件夹中的.txt文件全部找出并输出成一个列表。
  - 这里使用的os.walk()主要用来扫描某个指定目录下所包含的子目录和文件，它会以自顶向下的方式扫描出（现在的主目录，该目录下包含的子目录，该目录下包含的文件）三元组，如果这一for循环里面有break，则只会停留在最上一层的目录，否则会遍历当前文件夹中的所有子文件夹。
  - 同样通过os.path.splitext()判断是否是txt格式。

## 截取.txt文件中的部分内容

```python
# 匹配ITEM: TIMESTEP到ITEM: ATOMS id type x y z vx vy vz之间的内容
def match_and_delete(start, end, file_path):
    start = re.escape(start)
    end = re.escape(end)
    pattern = re.compile(r'%s(?:.|\s)*?%s'%(start,end))

    ori_file = open(file_path,encoding='utf-8')
    file_content = ori_file.read()
    updated_file = ''.join(re.split(pattern,file_content))
    ori_file.close()
    return updated_file
```

- 这里其实是在反向地操作，因为在数据的前后总是重复的有规律的一段，所以这里其实通过正则表达式匹配出这一些无关信息进行删除。match_and_delete()将已知开头结尾的一段文本全部从文件中删除，剩下部分拼接在一起。

## 导出.csv文件

原文件的每行数据是空格隔开，标准csv格式是英文逗号隔开，所以很简单的思路：

```python
for line in open('tmp'):
    final_line = re.sub(r' ', ',', updated_line)
    print(final_line, end='\n', file=csv_file)
```

- 用re.sub()函数将空格替换为逗号，逐行导出。

对于如下图所示的，更为规整的输出文件，每10行有一行数据，可以有另外一种思路。

![image-20210806011152498](https://pic.imgdb.cn/item/610c206d5132923bf8e315da.png)

```python
import pandas as pd

def logic(index):   
    if index % 10 == 9: 
        return False
    return True
    
df = pd.read_table(file_path, header=None, index_col=None, encoding='utf-8', names=['x', 'y', 'z', 'vx', 'vy', 'vz'], skiprows=lambda x: logic(x), sep='\s+', engine='python')
df.to_csv(csv_path, header=False, index=False)
```

- 自定义logic()函数，每10行取一行，其余全部跳过，通过pandas.read_table()函数中的skiprows参数就可以实现。
  - 这里用到了lambda函数，可以做到快速实现某项功能，省去函数命名等步骤。它的语法是`lambda 参数列表（和普通函数一样，逗号隔开）:关于参数的表达式`，其中表达式只能是单行的。
  - pandas.read_table()函数读出的是个DataFrame类，导出直接用pandas.to_csv()函数即可。

## 读取.csv文件并画图

```python
import numpy as np

matrix = np.loadtxt(open(csv_path, "rb"), delimiter=",", skiprows=0)

x_list = matrix[i]

import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_style('whitegrid')
songTi = mpl.font_manager.FontProperties(fname='C:\Windows\Fonts\simsun.ttc')
plt.hist(x_list, alpha=1.0)
plt.xticks(fontproperties=songTi,fontsize=12)
plt.yticks(fontproperties=songTi,fontsize=12)
plt.xlabel('x',fontproperties=songTi,fontsize=14)
plt.ylabel('出现频率（%）',fontproperties=songTi,fontsize=14)
plt.savefig('x_频率.png', dpi=600, bbox_inches='tight', transparent = True)
plt.show()
```

- 非常常规，numpy或者pandas都有读取csv格式的方法，这里用的numpy.loadtxt()。读取出的数据是一个列表结构，对它们为所欲为就好了。

- 画图用的matplotlib，用matplotlib.font_manager.FontProperties()专门定义了字体，因为中文会乱码。使用seaborn在这里只是装饰了图表样式，其实关于绘图它还有很多功能。

