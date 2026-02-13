# AwFileList附件列表

## 基本用法

由于没写`downLoad`和`preview`的实现，此示例不能下载

:::code fileList/fileList0.vue

:::

## API

### `<属性>` Attributes

| 参数名      | 默认值                   | 描述说明           | 类型           | 必填 |
| :---------- | :----------------------- | :----------------- | :------------- | ---- |
| datas       | `[]`                     | 附件的实例list     | Array<`IFile`> | 是   |
| canDownload | `true`                   | 是否能下载         | true           | 否   |
| watermark   | `{text: "", styles: {}}` | 水印               | object         | 否   |
| downLoad    | -                        | 下载的方法         | function       | 否   |
| preview     | -                        | 预览的方法         | function       | 否   |
| empty       | 无                       | 没有值时显示的文本 | string         | 否   |

### `<事件>` Events

| 事件名 | 回调参数 | 描述说明 |
| :----- | :------- | :------- |
| 无     |          |          |

### `<方法>` Exposes

| 方法名 | 参数 | 描述说明 | 返回值 |
| :----- | :--- | :------- | ------ |
| 无     |      |          |        |

### `<插槽>` Slots

| 插槽名 | 参数 | 描述说明 |
| :----- | :--- | :------- |
| 无     |      |          |

<style>
    img{
        display:inline-block
    }
</style>