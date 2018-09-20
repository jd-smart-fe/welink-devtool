# 微联本地调试工具
 微联App的HTML5页面在PC浏览器上调试。

## 环境依赖
 node >= 8

## 安装
 `npm install -g welink-devtool`

## 目录结构示例

```
  │-welink
  ├── project
  │   ├── css
  │   │   └── style.css
  │   ├── index.html
  │   └── js
  │       └── app.js
  └── welinkconfig.json
```

## 配置文件
 welinkconfig.json
 ```
  {
    jd.nsng.smart.url": "https://sbappgw.jd.com",
    "authenticationTokenKey": "0882741796_91900007_150149604599245054_c0b963d6",
    "staticPath": "project"
  }
 ```
`jd.nsng.smart.url` // 可以配置沙箱或线上地址，默认沙箱地址。

`authenticationTokenKey` // 需要在微联开发者中心获得。不能省略的配置。

`staticPath` // 要调试的HTML5项目目录，不能省略的配置。

### jd.nsng.smart.url

- 沙箱：`https://sbappgw.jd.com`
- 线上：`https://gw.smart.jd.com`

## 使用

```
  $ cd welink
  $ welink-devtool
```
浏览器输入：http://localhost:3000/project/index.html