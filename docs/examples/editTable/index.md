# AwEditTable可编辑表格
不支持Table Events，**不支持el-table内的树结构及其相关属性和方法**。后期有时间的话会重构
## 基本用法

示例里设置了`hidden`，基于业务需求在`mode="one"`的情况下，changeRowData基本是必须的

:::code editTable/editTable0.vue

:::

::: danger ❗注意：
可编辑表格的数据不是响应式
:::
::: details 👀 渲染规则
同AwForm一样，只渲染交集部分。例外：columns设置了`hidden: true`，它的优先级高

```js {3,7,13,16}
const columns = ref([
  {
    prop: "settingName",
    label: "标题名称",
  },
  {
    prop: "settingValue",
    label: "值",
  },
]);
const formProps = reactive({
  props: {
    settingName: {
      category: "input",
    },
    settingValue: {
      category: "select",
      options: [],
    },
    text: {
      category: "input",
      label: "文本",
    },
  },
 
});
```

:::

## 数据：添加行前

有时候需要在添加行之前需要处理下新的行数据，此时可以使用`addRowBefore`

:::code editTable/editTable1.vue

:::

## 插槽：identifier和empty

:::code editTable/editTable2.vue

:::

## 插槽：自定义header

:::code editTable/editTable3.vue

:::

## 插槽：自定义编辑状态

通过 `slot` 可以获取到 row, value, $index 

:::code editTable/editTable4.vue

:::

## API

### `<属性>` Attributes

::: details 👀 `changeRowData`说明：

必须要return出去个promise ，当不需要此事件时可以不写。

当changeRowData方法内的type类型为save时，可以通过往 resolve( )内传入接口返回的对象或者id值 来直接修改添加行的唯一标识，这样可以不用再额外请求整个table表格数据

:::

| 参数名        | 默认值                                                       | 描述说明                                                     | 类型                 | 必填 |
| :------------ | :----------------------------------------------------------- | :----------------------------------------------------------- | :------------------- | ---- |
| data          | `[]`                                                         | 显示的数据，同`el-table`的data                               | array                | 是   |
| columns       | `[]`                                                         | 同`el-table-column`的属性，只额外添加了 `hidden`控制其显示隐藏 | Array<`object`>      | 是   |
| props         | `{}`                                                         | 参考[`AwForm`](/examples/form/#props-props)组件的props       | object               | 是   |
| changeRowData | -                                                            | 当`save`、`edit`、`delete`时触发的方法，参数是`events`对象`{row，index，type}` | promise<object\|any> | 否   |
| rowKey        | `id`                                                         | 指定行的唯一值key                                            | string               | 否   |
| mode          | `one`                                                        | 指定是单行编辑，还是多行编辑                                 | one\|any             | 否   |
| isAddHidden   | `false`                                                      | 是否隐藏添加行                                               | boolean              | 否   |
| isActionFixed | `true`                                                       | 是否操作列固定                                               | boolean              | 否   |
| isOperate     | `true`                                                       | 是否显示操作列                                               | boolean              | 否   |
| isShowDel     | `true`                                                       | 是否显示删除按钮                                             | boolean              | 否   |
| addRowBefore  | -                                                            | 添加行前触发的方法                                           | promise<`object`>    | 否   |
| methods       | `{}`                                                         | props的`category`能触发的事件。其配置与elementPlus组件一致   | object               | 否   |
| tableProp     | `{ height: "auto", border: true,stripe: true,size: "small",}` | 同`el-table`的属性                                           | object               | 否   |

### `<事件>` Events

| 事件 | 回调参数 | 描述说明 |
| :--- | :------- | :------- |
| 无   |          |          |

### `<方法>` Exposes

| 方法名      | 参数 | 描述说明                                                     | 返回值                         |
| :---------- | :--- | :----------------------------------------------------------- | ------------------------------ |
| addRow      | -    | 手动触发添加行                                               | `void`                         |
| getData     | -    | 获取整个table表格的数据                                      | Array<`object`>                |
| awTableRef  | -    | 绑在`el-table`上的ref实例                                    |                                |
| getCellEdit | -    | 获取数组，**不建议修改**，里面包含：id值, 当前列的name,  整行是否编辑, 点击行index | [string,string,boolean,number] |

### `<插槽>` Slots

| 插槽名            | 参数                 | 描述说明                                                     |
| :---------------- | :------------------- | :----------------------------------------------------------- |
| empty             | -                    | 无数据时要渲染的内容                                         |
| append            | -                    | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上 |
| identifier        | -                    | 用于放置一些不需要有编辑的`el-table-column`，如：序号        |
| [**prop**]-header | `{label}`            | **prop** 是指`el-table-column`的prop值，用于自定义header样式 |
| [**prop**]-edit   | `{row,value,$index}` | **prop** 是指`el-table-column`的prop值，用于自定义编辑状态。**前提条件：**`category: "custom"` |

<style>
.el-link--info{
    color:var(--el-color-info)! important
}
.el-link--danger{
    color:var(--el-color-danger)! important
}
</style>