# ElSearchQuery

ElSearchQuery，是一个基于 ElementPlus的封装的搜索模块组件。适用于在 Vue 单页项目内快速生成搜索模块。

## 前置条件

1、ElementPlus组件

2、scss

## 未实现功能

暂无

## 属性

|    名称    |  类型  | 描述                                                         | 默认值                                              | 是否必填 |
| :--------: | :----: | :----------------------------------------------------------- | --------------------------------------------------- | :------: |
|  v-model   | object | 双向绑定的值。注：与下方的props、rules、methods通过key相互关联 | { }                                                 |    是    |
|   props    | object | 各子表单项属性。注：category为必填项，                       | { }                                                 |    是    |
|  methods   | object | 各子表单项事件                                               | { }                                                 |    否    |
|   rules    | object | 各子表单项所绑定的校验规则                                   | { }                                                 |    否    |
| inputWidth | number | 每个搜索项的输入框宽度                                       | 300                                                 |    否    |
|  formProp  | object | 绑定给form表单的属性，具体内容可参考elementPlus组件内的Form 属性。 | {   "label-width": "120px",   "label-suffix": "："} |    否    |

## Methods

|    方法名     | 参数 |       返回值       |                         说明                          |
| :-----------: | :--: | :----------------: | :---------------------------------------------------: |
| getSearchData |  无  |       object       |                   搜索项组成的对象                    |
|  resetSearch  |  无  | 空值的搜索项object | 重置校验事件，可做额外处理，例如：重置table表格的搜索 |

## 注意事项（全部）

参考AwForm组件
