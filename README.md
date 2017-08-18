> 本项目是在[vueBlog](https://github.com/elva2596/vueBlog)的基础上进行改造的。一个前端基于Vue2.0全家桶，后端基于Express+Mongodb的前后端分离博客。前端界面使用了flexbox+rem布局，后端界面使用了element ui。本项目可以作为一个前端进阶项目，从前端flexbox布局到前端框架的使用，再到后端以及数据库，是一个打通前后端流程的一个项目。

#  特点
* 支持 MarkDown 编辑
* 支持代码高亮
* 支持移动端浏览

# 我的修改
* 在文章阅读页根据登录cookie判断添加一个编辑按钮，直接跳转到文章编辑页面
* 主页的文章摘要显示第一个div内容和第一张图片
* 添加了一个问候页，并删除了注册页（直接在数据库中添加用户信息）
* 由于我的主页中包含大量图片，做了一下懒加载，将第三方库提取出来，通过cdn外链使用

### 前端工具
* Vue2.0
* Vue-Router
* Vuex
* axios
* element ui


### 后端工具
* express
* mongodb（mongolass）

后端的管理界面我直接使用了[element ui](http://element.eleme.io/#/)这个基于vue的组件库，很强大.


# 目录结构

```
│  .babelrc
│  .editorconfig
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  index.html
│  package.json
│  README.md
│
├─build
│      build.js
│      check-versions.js
│      dev-client.js
│      dev-server.js
│      utils.js
│      webpack.base.conf.js
│      webpack.dev.conf.js
│      webpack.prod.conf.js
│
├─config
│      dev.env.js
│      index.js
│      prod.env.js
│      test.env.js
│
├─server                        后端文件夹
│  │  .env
│  │  app.js    后端入口
│  │
│  ├─api
│  │      index.js  后端api
│  │
│  ├─lib
│  │      mongo.js 数据库
│  │
│  ├─middleware
│  │      checkToken.js
│  │      createToken.js
│  │
│  └─routes                 后端路由
│          admin.js
│          article.js
│          classify.js
│          index.js
│          login.js
│          reg.js
│
├─src       前端文件夹
│  │  App.vue
│  │  main.js   前端入口
│  │
│  ├─api    前端api
│  │      index.js
│  │
│  ├─assets
│  │  ├─css
│  │  │      commen.css
│  │  │      default.css
│  │  │      default0.css
│  │  │      highlight.css
│  │  │
│  │  ├─img
│  │  │      bg.jpg
│  │  │      bgm.jpg
│  │  │
│  │  └─js
│  │          commen.js
│  │          highlight.pack.js
│  │          hljs.js
│  │
│  ├─components
│  │  │  NotFound.vue
│  │  │
│  │  ├─backEnd             后端界面
│  │  │      Admin.vue
│  │  │      ArticleCreate.vue
│  │  │      ArticleEdit.vue
│  │  │      ArticleList.vue
│  │  │      ClassList.vue
│  │  │      Login.vue
│  │  │
│  │  └─fronted             前端界面
│  │          About.vue
│  │          Article.vue
│  │          Front.vue
│  │          Home.vue
│  │          Tags.vue
│  │          vfooter.vue
│  │          vheader.vue
│  │
│  ├─routes             前端路由vue-router
│  │      index.js
│  │      routes.js
│  │
│  └─store             前端vuex
│      │  actions.js
│      │  index.js
│      │  MsgAlert.js
│      │  mutations.js
│      │  states.js
│      │  types.js
```  

## Step
#### 环境
* Node.js v6
* mongoDB [下载地址](https://www.mongodb.com/download-center?jmp=nav#community)
[安装方法](https://docs.mongodb.com/manual/installation/)
安装完成后启动数据库  
`mongod`  


#### 克隆远程库
`git clone https://github.com/elva2596/vueBlog.git`


#### 安装前后端依赖
`npm install`


#### 全局安装supervisor
`npm install -g supervisor`


#### 启动mongodb服务器

在你安装的数据库文件中的bin目录中启动

`mongod`

#### 启动后端服务器
`进入到server文件夹下：supervisor app`


#### 启动前端项目
`回到项目根目录下运行：npm run dev`


#### 生成发布
`npm run build`


#### Notice
* 前后端启动时的路径不一样，前端在项目根目录，后端在servser根目录，其实可以把后端分离出来。
* 因为是前后端分离项目，必然涉及到跨域，使用webpack的proxyTable,进入到config文件夹的index.js,将proxyTable配置成：
`proxyTable: {
        '/api':{
        target:'http://localhost:3009/api',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },`



* 推荐[Robomongo](https://robomongo.org/)作为数据库的可视化管理工具
* 推荐Postman作为验证restful API的工具，请参考[这篇文章](http://www.cnblogs.com/mafly/p/postman.html)
* 这里的主页界面有个小小的bug,主页只显示每篇具体文章的摘要，在这里我取了一个巧，就是将从后端返回的数据经过markdown解析以后，用了一个正则把第一个div标签以及其中的内容和img链接给提取出来渲染到页面。因此后端在添加文章的时候必须在编写每篇文章的开头写一段话并附一张图片。


# Todo
* 添加评论功能


## License
MIT
