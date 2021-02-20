---
title: ABLabWordCloud文字云小程序第1版使用说明
date: 2021-01-20 19:37:18
updated: 2021-01-20 19:37:18
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Python
	- GUI
aplayer: true
type: github
#url: https://github.com/peachRL/ABLabWordCloud_GUI
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

该程序是继上一程序之后再一次尝试用Python代码生成GUI界面。

<!-- more -->

程序代码见：[ABLabWordCloud文字云小程序v2021.01.20(第1版)](https://github.com/peachRL/ABLabWordCloud_GUI)

[![standard-readme compliant](https://img.shields.io/badge/ABLabWordCloud-v2021.01.20-brightgreen.svg?style=flat-square)](https://github.com/peachRL/ABLabWordCloud_GUI)

## 背景

ABLabWordCloud小程序为ABLab实验室2020年终报告合集提供了文字云图。

## 安装

该项目使用Python编写，有图形化界面但无exe版本。请在windows系统中运行ABLabWordCloud_GUI.py使用。

## 使用说明

### 环境

**首先进入requirements文件夹，将requirements.txt中的包都装上。**

```shell
pip install -r requirements.txt
```

### 使用

按照程序的条目依次输入，然后点“开始”即可。“开始”分为**普通版**和**专业版**，区别在于专业版去除了一些生活词，两者的输出文件分别为“ABLab_WordCloud_conventional”和“ABLab_WordCloud_professional”。

### 界面和ico

界面由PySimpleGUI生成，没有ico。

<img src="https://img.imgdb.cn/item/600e87503ffa7d37b3f79806.png" alt="界面" style="zoom:50%;" />

## 维护者

[@peachRL](https://github.com/peachrl)


## 使用许可

[MIT](LICENSE) © peachRL

