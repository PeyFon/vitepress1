



# TODO

1. components新组件的开发
2. 一些基础业务的开发，如：附件/图片/视频上传、消息通知
3. keep-alive组件缓存
4. 脚手架的开发
5. 组件的在线预览调试



## 项目结构目录

```
.
|--docs
|    |--.vitepress
|    |    |--components
|    |    |    |--CodeBox.vue            //代码块盒子
|    |    |    |--CollapseTransition.vue
|    |    |    └─ ElementPlugin          //组件库
|    |    |--demos
|    |    |    |--form
|    |    |    |    |--form0.vue    //文档展示中不同功能的代码
|    |    |    |    |--form1.vue    //文档展示中不同功能的代码
|    |    |    |    ...
|    |    |    ...
|    |    |--plugins
|    |    |--theme
|    |    |--utils
|    |    |--config.js
|    |    ...
|    |--examples
|    |    |--form/index.md    //组件说明，调用.vitepress中demos具体相应例子
|    |    ...
|    |--guide    //guide页面相关
|    |--public   //assets
|    |--index.md
|    ..
...
```
