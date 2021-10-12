---
title: VOSviewer的安装与使用——文本聚类分析与可视化
date: 2021-08-21 23:08:30
updated: 2021-08-21 23:08:30
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- VOSviewer
	- Windows
aplayer: true
# type: bilibili
# url: https://www.bilibili.com/video/av8153395/
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

<div class="success">

> VOSviewer is a software tool for constructing and visualizing bibliometric networks.

</div>

这一篇文主要聊VOSviewer的安装与使用。当然，VOSviewer并不是唯一可以实现文本的聚类分析与可视化以梳理文献的软件，还有比如Histcite、CiteSpace等也可以，这就不在本文要讲的范围内了。

<!-- more -->

## 安装步骤

1. VOSviewer需要在Java环境下运行，因此首先安装[Java](https://www.java.com/zh-CN/download/)

![image-20210821132245760](https://image.wanyijizi.com/20210821/image-20210821132245760.png)

2. 下载[VOSviewer](https://www.vosviewer.com/download)，各系统均有对应安装包，下载解压后如下图所示

![image-20210821133056987](https://image.wanyijizi.com/20210821/image-20210821133056987.png)

双击VOSviewer即可运行程序。

## 基于Web of Science数据的使用

<div class="info">

> 需要在校园网内网或者从外部通过校园网访问Web of Science的条件下使用。

</div>

1. 进入Web of Science网站，按需检索想要知道的信息（选择不同数据库可以检索到的信息会不同，比如有的库就无法检索`所有字段`，只能检索`主题`、`关键词`之类的）：

![image-20210821140554500](https://image.wanyijizi.com/20210821/image-20210821140554500.png)

2. 导出制表符分隔文件（RIS、Excel（csv）等格式也可以，具体详情可查看VOSviewer的手册，下载的文件中那个pdf就是）

![image-20210821140804291](https://image.wanyijizi.com/20210821/image-20210821140804291.png)

3. 记录内容也是按需选择，最后会导出一个叫savedrecs.txt的文件

![image-20210821140912864](https://image.wanyijizi.com/20210821/image-20210821140912864.png)

4. 打开VOSviewer软件，点击左侧create，基于文献信息的分析内容，选based on bibliographic data：

![image-20210821142306327](https://image.wanyijizi.com/20210821/image-20210821142306327.png)

VOSviewer支持的文件格式里就有Web of Science：

![image-20210821142429971](https://image.wanyijizi.com/20210821/image-20210821142429971.png)

选择导入刚刚的制表符分隔文件（如果从Web of Science下载了多个saverecs文件，可以都选上导入多个文件）：

![image-20210821142446634](https://image.wanyijizi.com/20210821/image-20210821142446634.png)

比如做一个关键词的分析，可以选择Co-occurrence：

![image-20210821144129745](https://image.wanyijizi.com/20210821/image-20210821144129745.png)

设定至少出现2次才认为是需要分析的关键词：

![image-20210821144243909](https://image.wanyijizi.com/20210821/image-20210821144243909.png)

显示其中与其他词汇关联最多的20个：

![image-20210821144355745](https://image.wanyijizi.com/20210821/image-20210821144355745.png)

可以再手动筛选以下想要分析的词汇：

![image-20210821144645643](https://image.wanyijizi.com/20210821/image-20210821144645643.png)

得到聚类图谱：

![image-20210821144844506](https://image.wanyijizi.com/20210821/image-20210821144844506.png)

可选的图谱有Network Visualization、Overlay Visualization、Density Visualization三种，Density Visualization又分为Item desity和Cluster density两种，三种图谱的各种参数可以在右侧设置。如上图的Network Visualization圆的大小代表关键词权重，两个圆之间的距离越短表示关键词关联性越强。圆的颜色代表了各自的聚类。

回到第4步，如果要基于论文title、abstract等文本信息的词共现分析，就选择based on text data，前面的设置大同小异，counting method指同一篇文献多次出现的词语是算一遍还是算多遍。

![image-20210821150312936](https://image.wanyijizi.com/20210821/image-20210821150312936.png)

其他设置也大同小异，最后得到：

![image-20210821150750334](https://image.wanyijizi.com/20210821/image-20210821150750334.png)

## 基于~~Semantic Scholar~~Crossref数据的使用

### Semantic Scholar的报错

Semantic Scholar的数据需要通过API的调用导出JSON格式的文件。比如关键词near space hypersonic cruise vehicles的搜索，在Semantic Scholar网站有549条信息，将其中101-200条导出JSON文件，在浏览器地址栏输入：

```
https://api.semanticscholar.org/graph/v1/paper/search?query=near+space+hypersonic+cruise+vehicles&offset=100&limit=100&fields=externalIds,title,abstract,authors
```

理论上，保存下来即可得到JSON格式的文本文件。然而，放到VOSviewer里报错了：

![image-20210821200028383](https://image.wanyijizi.com/20210821/image-20210821200028383.png)

暂时没有搞清楚为什么，所以尝试另辟蹊径。除了JSON文件，VOSviewer也可以读取DOI，因此稍稍处理以下我们下载下来的JSON文件，提取出里面的DOI并导入：

![image-20210821212027644](https://image.wanyijizi.com/20210821/image-20210821212027644.png)

华丽地再一次报错了。

博主桃感觉自己找不出什么原因，网上也没有什么相关信息，想要解决大概得给开发者写邮件问问了。

### 换Crossref

大同小异，需要用API，而且每次能够导出的条数是有限制的，不过，随便写个循环就可以解决了。

```python
from urllib.request import urlopen,Request
import json

#从url获得json文件
def getAndSaveJSON(offset):
    #
    fullurl = "https://api.crossref.org/works?query=near+space+hypersonic+cruise+vehicles&sort=relevance&filter=from-pub-date:2012-01-01,type:journal-article&rows=1000&offset="+offset
    #
    header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'}
    req=Request(fullurl,headers=header)
    rawtext=urlopen(req).read()
    jsonStr = json.loads(rawtext.decode('utf8'))
    json.dump(jsonStr, open(offset+'.json', 'w'))
    return offset+'.json'

for i in range(0,10000,1000): #每次获取的信息条数有限，因此写个循环
    getAndSaveJSON(str(i))
```

以下是在Crossref网站搜索near space hypersonic cruise vehicles得到的期刊名分布：

<iframe   allowfullscreen="true"   src="https://app.vosviewer.com/?json=https://raw.githubusercontent.com/peachrl/peachrl.github.io/master/data/near_space_source.json&simple_ui=true"   width="100%"   height="75%"   style="border: 1px solid #ddd; max-width: 1200px; min-height: 500px" > </iframe>

## 总结

以上Web of Science和Semantic Scholar只是两个例子，基于什么网站什么数据库其实不重要，只要能够得到VOSviewer可读的文件格式，都可以导入进行分析，比如Mendeley之类的文献管理系统，都可以导出RIS格式。

ʅ（´◔౪◔）ʃ **重点是，你从图中得到了什么呢？**

