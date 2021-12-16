---
title: 解决hugo加载valine评论遇到报错的问题
date: 2021-12-16 20:32:34
updated: 2021-12-16 20:32:34
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Hugo
	- Valine
aplayer: false
# type: academics
# url: https://academics.wanyijizi.com/2021/12/07/%E5%90%84%E7%A7%8D%E5%AD%A6%E6%9C%AF%E6%8A%A5%E5%91%8A%E7%9A%84PPT%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E5%81%9A/
# hide: true
# hide: index
# sitemap: false
# indexing: false
---

混在十年的 Q 群里极大丰富了桃子关于博客和网站的知识。之前在十年 Q 群里收到[榆木大大](https://zhufan.net/)的 hugo 比 hexo 快很多的建议，加上桃子觉得现在这个 [yun](https://github.com/YunYouJun/hexo-theme-yun) 主题已经是我找到的所有 hexo 主题里最合心意的一个，继续使用 hexo 获得不了新的快乐。所以决定接下来尝试一下用其他方式构建博客——首先是 hugo。

<!-- more -->

本次尝试了一个没有封面、图文并茂的简单主题 [dream](https://github.com/g1eny0ung/hugo-theme-dream)。hugo 的使用和 hexo 差不太多，随便搜个教程就好。

>这里遇到一个小小的坑，是因为我只推送到一个二级目录，结果出现了 css 都找不到路径的情况。只需要在 config.toml 文件里写清楚 baseURL 就行，比如默认 hugo 生成的文件都在 public 文件夹里，就应该写：
>
>```
>baseURL = "https:/hugo.wanyijizi.com/test/public"
>```
>
>感谢[求索日记](https://xiabanlo.cn)帮我找到这个问题~~

选择主题 [dream](https://github.com/g1eny0ung/hugo-theme-dream) 的原因之一是它支持 Valine，之前桃子的 Valine 已经是个有完整的后台管理、邮件通知的评论系统了，可惜因为备案关闭了。我觉得，如果只是子域名的二级目录，用一下不合规的评论大概也没人管，因此，总之……

按照 [dream](https://github.com/g1eny0ung/hugo-theme-dream) 主题自带的文档，在 config.toml 文件里加上 AppID 和 AppKey 的值：

```
valine = true
LEANCLOUD_APP_ID = "12345678***************"
LEANCLOUD_APP_KEY = "**************"
VALINE_LANGUAGE = "zh-CN"
```

就应该可以使用了。但实际上，尝试评论会发现提交不了，打开控制台，发现显示 https://us.avoscloud.com/1.4/classes/Comment?xxxxx 请求失败，（net::ERR_NAME_NOT_RESOLVED）……

Google 了一下发现，桃子并不是第一个遇到类似问题的人，参考[网址](https://ethant.top/articles/hexo541u/#valine%E8%8E%B7%E5%8F%96%E8%AF%84%E8%AE%BA%E5%A4%B1%E8%B4%A5)，https://us.avoscloud.com/ 这个域名是 Valine.min.js 在没有 serverURLs 的值的时候使用的，现在已经失效了。可以替换为 LeanCloud 提供的服务器地址，如下图。

<img src="https://image.wanyijizi.com/20211216/image-20211216211749331.png" alt="image-20211216211749331" style="zoom: 67%;" />

以下针对主题 [dream](https://github.com/g1eny0ung/hugo-theme-dream)，不过其他主题大概大同小异？

修改 themes\dream\layouts\_default\single.html 文件，加上 serverURLs：

```
<script>
    new Valine({
        el: '#vcomments',
        serverURLs: {{ .Site.Params.LEANCLOUD_serverURLs }},
        appId: {{ .Site.Params.LEANCLOUD_APP_ID }},
        appKey: {{ .Site.Params.LEANCLOUD_APP_KEY }},
        lang: {{ .Site.Params.VALINE_LANGUAGE }}
    })
</script>
```

对应修改 config.toml 文件，加上 serverURLs：

```
valine = true
LEANCLOUD_serverURLs = "https://12345678.api.lncldglobal.com"
LEANCLOUD_APP_ID = "12345678***************"
LEANCLOUD_APP_KEY = "**************"
VALINE_LANGUAGE = "zh-CN"
```

评论显示顺利：

<img src="https://image.wanyijizi.com/20211216/image-20211216211926769.png" alt="image-20211216211926769" style="zoom:67%;" />

邮件提醒顺利：

<img src="https://image.wanyijizi.com/20211216/image-20211216212403436.png" alt="image-20211216212403436" style="zoom: 67%;" />

后台显示正常：

<img src="https://image.wanyijizi.com/20211216/image-20211216212424034.png" alt="image-20211216212424034" style="zoom:80%;" />
