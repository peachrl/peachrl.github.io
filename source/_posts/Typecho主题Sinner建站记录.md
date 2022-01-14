---
title: Typecho主题Sinner建站记录
date: 2022-01-14 13:54:59
updated: 2022-01-14 13:54:59
author: peachRL
email: 
description: 
categories: 软件
tags: 
	- Typecho
aplayer: false
# type: academics
# url: https://academics.wanyijizi.com/2021/12/07/%E5%90%84%E7%A7%8D%E5%AD%A6%E6%9C%AF%E6%8A%A5%E5%91%8A%E7%9A%84PPT%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E5%81%9A/
# hide: true
# hide: index
# sitemap: false
# indexing: false
---

想着写博客也要雨露均沾，上次写过 Hugo，这次便写写 Typecho。在[橘子大大](https://moc.qq.pcno.cn/)强烈要求下桃子最近尝试了 Typecho 建站，并且一眼看中了[泽泽的 Sinner 主题](https://blog.zezeshe.com/archives/sinner-typecho-theme.html)（泽泽这个名字感觉不怎么适合叫泽泽大大…），感觉 Sinner 这个主题功能丰富、多图、适合搞事。

<!-- more -->

## 背景

桃子的服务器是 Ubuntu 20.04 LTS 系统，已经安装了 php 7.4.3，nginx 1.18.0，mysql 版本 8.0.27-0ubuntu0.20.04.1。

## 用 root 用户以最高权限新建数据库

```shell
mysqladmin -u root -p create ARTWORK
```

假如往后遇到初始化配置 typecho 无法连接数据库，可能是加密方式不对，可以参考 [网址](https://www.cnblogs.com/tomyyyyy/p/14584379.html) 修改，将认证方式改为 mysql_native_password。

假如遇到 typecho 不能显示 emoji，可能是数据库编码不对或者 typecho 的配置需要修改，可以参考 [网址](https://limbopro.com/archives/Typecho-emoji.html)。

## 修改 nginx 配置文件

```nginx
server {
    listen 80;
    server_name artwork.wanyijizi.com;
	return 301 https://$host$request_uri;
}

server {
	listen 443 ssl; 

    server_name artwork.wanyijizi.com;
    root /home/lighthouse/artwork.wanyijizi;
    index index.html index.htm index.php;

    location / {
    if (-f $request_filename/index.html){
            rewrite (.*) $1/index.html break;
    }
    if (-f $request_filename/index.php){
            rewrite (.*) $1/index.php;
    }
    if (!-f $request_filename){
            rewrite (.*) /index.php;
    }
        try_files $uri $uri/ =404;
    }

    location ~ .*\.php(\/.*)*$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }

	ssl_certificate /etc/nginx/certs/1_artwork.wanyijizi.com_bundle.crt;
	ssl_certificate_key /etc/nginx/certs/2_artwork.wanyijizi.com.key;
	add_header Strict-Transport-Security "max-age=31536000";

	ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
}
```

并重启nginx：`sudo nginx -s reload`。（当然也不要忘记添加 DNS 解析）

## 安装 Typecho

### 下载

进入网站要放的文件夹(根目录)内进行下载：

```shell
wget http://typecho.org/downloads/1.1-17.10.30-release.tar.gz && tar xvzf 1.1-17.10.30-release.tar.gz && cd build && mv * .. && cd .. && rm -rf 1.1-17.10.30-release.tar.gz build && chown -R www:www *
```

之后可以进入网址 `https://你的域名/install.php` 看到如下页面：

![20220114151817](https://image.wanyijizi.com/20220114/QQ截图20220114151817.jpg)

### 初始化配置

前面的数据库配置根据需要修改（大部分不用修改，数据库用户名就是 root，数据库名是刚刚新建的时设定的 ARTWORK，下面的数据库密码是刚刚在 mysql 新建数据库时的密码）。后面创建管理员账号也很好理解。

确认后会要求在网站根目录自行创建一个叫 config.inc.php 的文件。在这里可以把其中的数据库参数中utf8的编码改成 `'charset' => 'utf8mb4'`，以便未来显示 emoji。

创建完毕，点击继续安装。

这样就好啦！在`https://artwork.wanyijizi.com/index.php`可以看到：

![image-20220114153434675](https://image.wanyijizi.com/20220114/image-20220114153434675.png)

## 安装和配置 Sinner 主题

将下载好的主题放入 `网站根目录/usr/themes`。在网站登录管理员账号，进入后台，在控制台修改外观：

![image-20220114153954438](https://image.wanyijizi.com/20220114/image-20220114153954438.png)

现在已经更改了外观，

![image-20220114154332977](https://image.wanyijizi.com/20220114/image-20220114154332977.png)

后面的配置完全按照[泽泽的文档](https://www.yuque.com/qqdie/sinner)就可以，桃子就不写啦！
