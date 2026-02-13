# EditableGrid

EditableGrid，是一个基于 ElementUI 的table编辑表格插件。**不支持el-table内的树结构**，想用树结构请使用*EditableTreeGrid*组件

## 前置条件

1、ElementUI组件

2、scss



## 未实现功能

不支持Table Events（后期可根据业务需要加上）

不支持Table Slot

**不支持el-table内的树结构及其相关属性和方法**

## 新增功能

2021-07-21：

添加category类型：tag、custom

当isAddHidden为true时，让添加行在最上方展示

当changeRowData方法内的类型为save时，可以通过往 resolve( )内传入接口返回的对象或者id值 来直接修改添加行的唯一标识，这样可以不用再额外请求整个table表格



## 属性

|     名称      |  类型   | 描述                                                         | 默认值 | 是否必填 |
| :-----------: | :-----: | :----------------------------------------------------------- | ------ | :------: |
|    columns    |  array  | 接收属于el-table-column属性描述的数组。具体可传属性请查看el-table表格内的**Table-column Attributes** | [ ]    |    是    |
|   formProps   | object  | 用于说明el-table-column项下可编辑的category类型及其各类型相关属性 | {}     |    是    |
|     datas     |  array  | 显示的数据                                                   | []     |    否    |
|     mode      | string  | 单行或多行编辑的开关                                         | one    |    否    |
| isActionFixed | boolean | 右侧操作栏是否固定，当此项为true时宽度固定为125              | true   |    否    |
|  isAddHidden  | boolean | 添加按钮是否展示                                             | false  |    否    |
|    rowKey     | string  | datas里每一行的唯一标识                                      | id     |    否    |

## formProps属性

| 名称    | 类型   | 描述                                                         | 是否必填 |
| ------- | ------ | ------------------------------------------------------------ | -------- |
| props   | object | 内容为要编辑的不同类型对象的属性，每一个子对象内的category必填，具体的category值请查看下方的***注意事项（全部）*** | 是       |
| methods | object | 内容为要编辑的不同类型对象的方法，具体内容请查看下方的***demo示例*** | 是       |

**剩余属性请参考elementUI的el-table组件内的Table Attributes**

## formProp的结构示例demo

```javascript
        formProps: {
          props: {
            id: {
              category: "text" //必填
            },
            parentId: {
              category: "text"
            },
            title: {
              category: "text"
            },
            number: {
              category: "number",
              precision: 4 //number类型 默认是整数，可通过此字段来控制长度
            },

            date1: {
              category: "date-picker",
              type: "daterange",
              valueFormat: "yyyy-MM-dd"
            },
            time: {
              category: "time-picker"
            },

            select: {
              category: "select",
              options: [
                {
                  value: "1",
                  label: "黄金糕"
                },
                {
                  value: "2",
                  label: "双皮奶"
                },
                {
                  value: "3",
                  label: "蚵仔煎"
                }
              ]
            },
            switch: {
              category: "switch"
            },
            radio: {
              category: "radio",
              options: [
                {
                  value: "选项1",
                  label: "黄金糕"
                },
                {
                  value: "选项2",
                  label: "双皮奶"
                }
              ]
            },
            checkbox: {
              category: "checkbox",
              options: [
                {
                  value: "选项1",
                  label: "黄金糕1"
                },
                {
                  value: "选项2",
                  label: "双皮奶1",
                  disabled: true
                },
                {
                  value: "选项3",
                  label: "蚵仔煎"
                }
              ]
            },
            cascader: {
              category: "cascader",
              options: [
                {
                  value: "zhinan",
                  label: "指南",
                  children: [
                    {
                      value: "shejiyuanze",
                      label: "设计原则",
                      children: [
                        {
                          value: "yizhi",
                          label: "一致"
                        },
                        {
                          value: "fankui",
                          label: "反馈"
                        },
                        {
                          value: "xiaolv",
                          label: "效率"
                        },
                        {
                          value: "kekong",
                          label: "可控"
                        }
                      ]
                    },
                    {
                      value: "daohang",
                      label: "导航",
                      children: [
                        {
                          value: "cexiangdaohang",
                          label: "侧向导航"
                        },
                        {
                          value: "dingbudaohang",
                          label: "顶部导航"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          },
          methods: {
            title: {
              change: value => {
                console.log(value, "value");
              }
            },
            number: {
              input: value => {
                console.log(value, "value-number-input");
              },
              change: value => {
                console.log(value, "value-number-change");
              }
            }
          },
          stripe: true
        }
```

## slot属性

| 名称          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| empty         | 空数据时显示的文本内容                                       |
| slot          | 自定义插槽未编辑时的展示形式。具体内容请查看下方***调用示例*** |
| 表头名-header | 自定义当前列的表头显示。具体内容请查看下方***调用示例***     |

## Events

|    事件名     |       参数        | 返回值  |                             说明                             |
| :-----------: | :---------------: | :-----: | :----------------------------------------------------------: |
| changeRowData | { row,index,type} | promise | 它是传入给组件内的方法。<br />row：当前选中行的数据。<br />index：当前点击行的数值<br />type：说明当前操作类型是save，edit还是delete。<br /> |

## Methods

| 方法名  | 参数 |          说明           |
| :-----: | :--: | :---------------------: |
| getData |  无  | 获取整个table表格的数据 |
| addRow  |  无  |     手动触发添加行      |

## 注意事项（全部）

**columns**属性：

​	这个属性除了接收**Table-column Attributes**之外有一个自定义的属性，用于控制当前列的展示。 hidden:true

**changeRowData**事件：

​	**必须**要return出去个promise ，当不需要此事件时可以不写

**formatter**属性：

​	当使用**Table-column Attributes**内的formatter属性时， row, column, cellValue, index 这四个参数都要传

**props**内的type值：

1. category可输入的值有：`text、number、time-picker、select、tag、switch、radio、checkbox、cascader、custom、date-picker`
2. 当category值为**number**时：可通过precision属性来控制小数点位数，默认是整数

**此组件不能使用el-table的树结构**

将来如果要加新的category类型时记得要处理组件内的templeteData（这句话是给开发者看的）

