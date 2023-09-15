## 模板简介

1.  基于 koa-generator 进行项目搭建

        npm install -g koa-generator
        koa2 projectName
        cd /projectName
        npm install / yarn

2.  开发配置

    1. nodemon 监听文件变化
    2. cross-env 配置指令参数

3.  扩展与补充了相关能力

    1. 路由拆分与自动注册
       require-directory
       自定义路由中间件 用于鉴权 重定向等

    2. 日志记录

       log4js

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

4.  工具库

    1. dayjs 日期处理
    2. bcryptjs 加密
    3. uuid 唯一 id 生成
    4. svg-captcha 数字验证码 svg
    5. querystring
