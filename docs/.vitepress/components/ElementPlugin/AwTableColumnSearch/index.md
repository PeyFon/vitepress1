# AwTableColumnSearch

AwTableColumnSearch，是一个基于 ElementPlus 的table组件内的el-table-column编写的插件。适用于在 基于Vue、scss和 ElementPlus 单页项目中使用table组件时在其表头内插入搜索项。



## 属性

|     名称      |           类型            | 描述                          | 是否必填 |
| :-----------: | :-----------------------: | :---------------------------- | :------: |
| search-filter |         *object*          | 要显示的筛选组件。详情见下方  |    是    |
|    v-model    | *[string，array，object]* | 返回的筛选值。                |    是    |
|    visible    |         *Boolean*         | 控制table里当前这一列是否显示 |    否    |

### search-filter属性

|   名称   |   类型   | 描述                                                         | 是否必填 |
| :------: | :------: | :----------------------------------------------------------- | :------: |
| category | *string* | 要显示的筛选类型，可选值**input**、**radio**、**checkbox**、**select**、**cascader**、**date-picker**、**time-picker**、**time-select**、**custom** |    是    |
|  attrs   | *object* | 可输入要绑定的  **key：value**  。可绑定的key value参考elementPlus内的相关**input**、**select**、**cascader**d等对应组件 |    否    |
|  methods  | *object* | 要给筛选组件绑定的事件，可绑定多个，参考elementPlus内的相关组件。例如：{click：function（），change：function（）} |    否    |

## 事件

| 名称           | 描述                     | 参数  |
| -------------- | ------------------------ | ----- |
| searchCallback | 在 修改了v-model值时触发 | value |

## 方法

| 名称         | 描述                 | 参数 |
| ------------ | -------------------- | ---- |
| closePopover | 手动触发popover的关闭 | 无   |

## slot

| 名称    | 描述                                                     | 参数                  |
| ------- | -------------------------------------------------------- | --------------------- |
| header  | 当筛选条件需要自定义时使用，前置条件是category值为custom | column，$index，value |
| default | 渲染当前列的自定义展示                                   | row，$index，value    |

## 注意事项（全部）

1. 同时存在slot内的default与formatter时，**formatter优先**。（formatter是el-table-column上的属性）
2. 使用插槽 header的前置条件是 **type：custom**
3. 在使用search-callback事件 且当前table表格有分页器的时候，切记要先把 ***页数值改为1***，或者传入currentPageName属性，
4. 当此组件和el-table-filter组件一起使用时， **visible**属性的优先级**小于**el-table-filter组件接收的**columnsArr**属性

## search-filter示例

```javascript
:search-filter="{
    category: 'input',
    attrs: {
        placeholder: '请输入合约规划名称'，
    }，
    methods: {
     click:function(),
     change:function()
    }
}"
```

## 调用示例

