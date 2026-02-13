# CropperPhoto

CropperPhoto，是一个基于 ElementPlus和vue-cropper的图片裁剪插件，旨在于对vue-cropper的二次封装。

vue-cropper的git源码：<https://github.com/xyxiao001/vue-cropper>

## 前置条件

1、ElementPlus组件

2、vue-cropper

## 未实现功能

1、报错：Unable to preventDefault inside passive event listener invocation

**具体情况是：从 chrome56 开始，在 window、document 和 body 上注册的 touchstart 和 touchmove 事件处理函数，会默认为是 passive: true。浏览器忽略 preventDefault() 就可以第一时间滚动了。因此， touchstart 和 touchmove 事件处理函数中调用 e.preventDefault() ，会被浏览器忽略掉，并不会阻止默认行为。**

这个报错需要vue-cropper插件的作者解决。

2、该组件每次只能裁剪一张，不能对多张图片裁剪。

## 属性

|  名称   |  类型   | 描述                                                     | 默认值            | 是否必填 |
| :-----: | :-----: | :------------------------------------------------------- | ----------------- | :------: |
| v-model | boolean | 控制裁剪弹窗的显示和隐藏                                 | -                 |    是    |
|  file   | object  | 这个对象是通过el-upload组件传进来的file对象              | {url: " "}        |    是    |
| options | object  | 裁剪组件的基础配置option，可以覆盖掉封装组件内的默认配置 | 请参考vue-cropper |    否    |

## 事件

|   方法名    | 参数 | 返回值 |             说明             |
| :---------: | :--: | :----: | :--------------------------: |
| getFileList |  无  | array  | 获取裁剪处理后的file文件数组 |

剩余的方法请参考vue-cropper组件。

方法的调用写法：自定义组件名.cropperRef.*方法*名

 *方法*名：名字取vue-cropper组件内置方法的最后一个字段。例如：获取截图框宽度可以写成     自定义组件名.cropperRef.cropW

## 


