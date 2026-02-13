# AwCropperPhoto 图片裁剪

vue-cropper的源码：<https://github.com/xyxiao001/vue-cropper>

## 基本用法

:::code cropperPhoto/cropperPhoto0.vue

:::

## API


### `<属性>` Props

| 参数名  | 默认值            | 描述说明                                                 | 类型    | 必填 |
| :------ | :---------------- | :------------------------------------------------------- | :------ | ---- |
| v-model | `false`           | 是否显示                                                 | boolean | 是   |
| file    | {url: " "}        | 这个对象是通过el-upload组件传进来的file对象              | object  | 是   |
| options | 请参考vue-cropper | 裁剪组件的基础配置option，可以覆盖掉封装组件内的默认配置 | object  | 否   |

### `<事件>` Events

::: details 额外说明

剩余的方法请参考vue-cropper组件。

方法的调用写法：自定义组件名.cropperRef.**方法名**

 **方法**名：名字取vue-cropper组件内置方法的最后一个字段。例如：获取截图框宽度可以写成   自定义组件名.cropperRef.cropW

:::

| 事件        | 回调参数 | 描述说明                     |
| :---------- | :------- | :--------------------------- |
| getFileList | array    | 获取裁剪处理后的file文件数组 |
