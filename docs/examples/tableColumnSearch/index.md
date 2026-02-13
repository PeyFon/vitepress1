# AwTableColumnSearch表格列搜索

## 基本用法

:::code tableColumnSearch/tableColumnSearch1.vue

:::

## 布局：隐藏列

设置`visible="false"`隐藏列

:::code tableColumnSearch/tableColumnSearch2.vue

:::

## 插槽：自定义header

通过设置`#header="scope"`来设置自定义的搜索头。同时，示例里也展示了如何手动触发`closePopover`方法

:::code tableColumnSearch/tableColumnSearch3.vue

:::

## 插槽：default

自定义展示内容

:::code tableColumnSearch/tableColumnSearch4.vue

:::

::: warning 💡 提示
同时存在slot与formatter时，formatter优先。*请看上方示例的range列部分代码*
:::



## API

### `<属性>` Attributes

| 参数名                    | 默认值 | 描述说明                                                     | 类型    | 必填 |
| :------------------------ | :----- | :----------------------------------------------------------- | :------ | ---- |
| v-model                   | -      | 双向绑定的筛选值                                             | any     | 是   |
| search-filter             | `{ }`  | 要显示的筛选组件其配置选项，具体看下表[ `<search-filter>` **search-filter**](./#search-filter) | object  | 是   |
| visible                   | `true` | 是否显示当前列                                               | boolean | 否   |
| el-table-column组件的属性 | -      | 请查看所使用的el-table-column组件属性                        | -       | -    |

### `<search-filter>` search-filter

::: details 👀 `category`说明：

category能输入的值有：

"input" | "radio" | "checkbox" | "select" | "cascader" | "date-picker" | "time-picker" | "time-select" | "custom";

命名规律：

- 去掉 组件的el-前缀。如：el-input去掉前缀后为 `input`
- 部分ElementPlus组件存在 **group组** 的概念，对于这种组件既要去掉el-前缀也要去掉-group。如：el-radio-group去掉前缀和后缀为 `radio`
- AwTableColumnSearch额外自定义了`custom`

:::

| search-filter | 类型     | 描述说明                                                     | 可选值     | 默认值 |
| :------------ | :------- | :----------------------------------------------------------- | :--------- | ------ |
| category      | `string` | form-item要显示的类型                                        | 看上方说明 | -      |
| attrs         | `object` | 可输入要绑定的  **key：value**  。可绑定的key value参考elementPlus内的相关**input**、**select**、**cascader**d等对应组件 | -          | {}     |
| methods       | `object` | 要给筛选组件绑定的事件，可绑定多个，参考elementPlus内的相关组件。例如：*{click：function（），change：function（）}* | -          | -      |
| empty         | any      | 默认的空值                                                   | -          | -      |

### `<事件>` Events

::: warning 💡 友情提示

不推荐使用`searchCallback`，其仅用于版本兼容，将在未来的某版本中删除。在vue3版本内应 监听绑定的v-model值变化 去触发table表格的更新事件

:::

| 事件名         | 回调参数        | 描述说明                 |
| :------------- | :-------------- | :----------------------- |
| searchCallback | v-model绑定的值 | 在 修改了v-model值时触发 |

### `<方法>` Exposes

| 方法名       | 参数 | 描述说明                     | 返回值 |
| :----------- | :--- | :--------------------------- | ------ |
| closePopover | -    | 手动触发el-popover组件的关闭 | `void` |

### `<插槽>` Slots

| 插槽名  | 参数                      | 描述说明                                                     |
| :------ | :------------------------ | :----------------------------------------------------------- |
| header  | `{column，$index，value}` | 当筛选条件需要自定义时使用，**前提条件是category值为custom** |
| default | `{row，$index，value}`    | 渲染当前列的自定义展示                                       |
