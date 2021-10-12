---
title: ABLabPickME抽奖小程序第0版使用说明
date: 2021-01-16 00:02:57
updated: 2021-01-16 00:02:57
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Python
	- GUI
	- Windows
aplayer: true
#type: github
#url: https://github.com/peachRL/ABLabPickME
# hide: true
# # hide: index
# sitemap: false
# indexing: false
---

之所以称为第0版，是因为里面还有很多很多bug，只是时间有限的潦草之作。可能我写代码也比较少，有点写到哪儿算哪儿的感觉，没有在写之前理清逻辑，因此这个程序不按照说明操作会出问题。主要还是想借这个程序尝试一下Python代码打包成.exe程序以及生成GUI界面，顺便根据实验室年会需求实现抽奖的功能。所以就先这样叭（，有什么问题明年年会再改🤣）

<!-- more -->

程序代码见：[ABLabPickME抽奖小程序v2021.01.16(第0版)](https://github.com/peachRL/ABLabPickME)

[![standard-readme compliant](https://img.shields.io/badge/ABLabPickME-v2021.01.16-brightgreen.svg?style=flat-square)](https://github.com/peachRL/ABLabPickME)

## 背景

ABLabPickME小程序基于ABLab实验室年会随机报告的需求，对实验室成员进行随机抽奖。

## 安装

该项目使用Python编写，使用Pyinstaller打包成exe，在**gist**文件夹中。仅在windows系统使用。

本小程序不需要安装啦！直接双击ABLabPickME_GUI.exe使用。

## 使用说明

### 储存

ABLabPickME的数据储存在./data文件夹中。若从上次储存的结果开始，则不需要输入文件；若选择重新开始，需输入一个命名为namelist.txt的文件，示例在./data文件夹中有。

ABLabPickME使用自动储存，可用于每次抽取一人排除一人；使用不自动储存，则每次都会从同一名单抽取。

默认选项为“从上次储存开始”、“自动保存结果”。

### 抽取范围

包括老师组以及各年级组。默认选项为2015-2020年级组。重新选择范围的话请重新开始。

### 界面和ico

界面由PySimpleGUI生成，ico为随手打的。

<img src="https://image.wanyijizi.com/20210116/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210116211651.png" alt="界面" style="zoom:50%;" />

<img src="https://image.wanyijizi.com/20210116/ABLab.png" alt="ico" style="zoom:25%;" />

## 维护者

[@peachRL](https://github.com/peachrl)


## 使用许可

[MIT](LICENSE) © peachRL