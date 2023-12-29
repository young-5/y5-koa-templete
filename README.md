## 模板简介

1.  基于 koa-generator 进行项目搭建

        npm install -g koa-generator

        koa2 projectName

        cd /projectName

        npm install / yarn

        npm run start

2.  项目结构

```

   |___bin                 koa配置：server配置
   |___configs             项目配置：如 接口白名单，转发地址等
   |___constants           常量配置
   |___cores               项目核心：初始化加载路由等
   |___dataFiles           本地数据文件
   |___helper              业务逻辑
   |___html                静态资源
   |___logger              日志
   |___middlewares         中间件
   |___models              模型
   |___public              公共资源
   |___routes              路由
   |___sercers             功能服务：文件操作，数据库mongo redis
   |___utils               公共方法
   |___views               视图模板
   |___app.js              入口文件

```

3.  开发配置

    1. nodemon 监听文件变化
    2. cross-env 配置指令参数

4.  扩展与补充了相关能力

    1. 路由拆分与自动注册
       require-directory
       自定义路由中间件 用于鉴权 重定向等

    2. 日志记录

       log4js
       console 打印

    3. 静态资源服务器

       koa-static

    4. 异常捕获与处理

       自定义中间件
       koa-onerror
       on("error",()=>{...}）捕获
       koa-logger 打点

    5. 数据格式设置

       koa-body
       koa-parameter
       joi + 自定义 joi 路由校验中间件

    6. 身份验证

       jsonwebtoken
       自定义接口鉴权中间件

    7. 缓存处理

       koa-generic-session
       koa-redis
       koa-session

    8. 数据库

       redis
       mongoose

    9. 上传与文件存储

       koa-send 文件传输
       文件上传：/servers/file
       数据写入：/utils/files

    10. 代理

        koa2-proxy-middleware

5.  工具库

    1. dayjs 日期处理
    2. bcryptjs 加密
    3. uuid 唯一 id 生成
    4. svg-captcha 数字验证码 svg
    5. querystring
