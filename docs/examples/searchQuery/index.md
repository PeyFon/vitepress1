# AwSearchQuery搜索组件

组件由`el-form`和flex布局组成

## 基本用法

`inputWidth`设置每个输入项的宽度，label-width默认是120px。

:::code searchQuery/searchQuery0.vue

:::

## API

### `<属性>` Attributes

::: info 👀 说明：

`v-model`、`props`、`methods`、`formProp`、`rules`同[AwForm](/examples/form/#属性-attributes)组件一样 ，这里不在赘述 

:::

| 参数名     | 默认值                                          | 描述说明                   | 类型     | 必填 |
| :--------- | :---------------------------------------------- | :------------------------- | :------- | ---- |
| v-model    | `{ }`                                           | 双向绑定的对象值。         | object   | 是   |
| props      | `{ }`                                           | 各子表单项属性。           | object   | 是   |
| methods    | `{ }`                                           | 各子表单项事件。           | object   | 否   |
| formProp   | `{"label-width": "120px","label-suffix": "："}` | 下载的方法                 | function | 否   |
| rules      | `{ }`                                           | 各子表单项所绑定的校验规则 | object   | 否   |
| inputWidth | 300                                             | 输入项的宽度               | number   | 否   |

### `<事件>` Events

| 事件名        | 回调参数            | 描述说明     |
| :------------ | :------------------ | :----------- |
| resetSearch   | v-model             | 重置按钮事件 |
| getSearchData | 校验通过后的v-model | 搜索按钮事件 |

### `<方法>` Exposes

| 方法名           | 参数 | 描述说明                       | 返回值 |
| :--------------- | :--- | :----------------------------- | ------ |
| awSearchQueryRef |      | 组件内绑在`el-form`上的ref实例 |        |

### `<插槽>` Slots

| 插槽名 | 参数 | 描述说明 |
| :----- | :--- | :------- |
| 无     |      |          |
