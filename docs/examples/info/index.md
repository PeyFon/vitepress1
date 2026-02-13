# AwInfo详情组件



## 基本用法

布局由`el-row`、`el-col`实现

:::code info/info0.vue

:::

## API

### `<属性>` Attributes

| 参数名  | 默认值          | 描述说明               | 类型   | 必填 |
| :------ | :-------------- | :--------------------- | :----- | ---- |
| title   | `" "`           | 标题                   | string | 否   |
| data    | `{ }`           | 数据来源               | object | 是   |
| rowProp | `{gutter: 20 }` | 绑定在`el-row`上的属性 | object | 否   |
| colProp | `{ }`           | 绑定在`el-col`上的属性 | object | 否   |

<style>
    img{
        display:inline-block
    }
</style>