# AwPivotTable 表格行列转换

在尽量不影响el-table组件原有使用方式基础上的行列转换的实现，整体只在原有el-table组件的基础上多加了几个属性。

::: tip  📢声明：

el-table-column里的`type`值为非`'default'`的会叫做**特殊类型列**，*它不会参与到行列转换*

行列转换时要转换的那一列column会叫做**属性列**

el-table-column里没有prop属性的会叫做**非转置列**，*它不会参与到行列转换*

剩余的列会叫做**数据列**

:::

::: warning  💡未实现/未验证功能：

Table插槽里的：**append** **empty**未实现

Table-column插槽里的：**filter-icon** **expand**未实现

**特殊类型列**则完全不支持任何插槽

展开行、合并/合计行/列、树形数据、筛选，这些未验证

:::


## 基本用法

` isTransposed `属性控制行列转换。由于转换前后数据的行列数不一定会相同，所以**属性列**和**数据列**在转换前写在`el-table-column`组件上属性会在转换后统一用一个默认的属性。如果要修改的话可以在aw-pivot-table上传入`columnAttrs`属性，具体内容可以查看下面的**样式：el-table-column**这个示例

:::code pivotTable/pivotTable0.vue

:::



## 样式：el-table-column

`columnAttrs`设置**属性列**和**数据列**上转换后要绑定的属性对象。`propertyColumnWidth` 设置**属性列**的宽度，如果`columnAttrs`里也有宽度的话，在**属性列**上优先级没有`propertyColumnWidth` 高。`propertyColumnLabel`是设置**属性列**上的label字段

:::code pivotTable/pivotTable1.vue

:::

:::details    转换后的`el-table-column`   ***属性列***  默认属性：

`propertyColumnWidth`是设置**属性列**的宽，`columnAttrs`是设置**属性列**和**数据列**上的对象

 ```js     
  if (props.propertyColumnWidth) {
    return Object.assign(
      {
        align: "center",
        headerAlign: "center",
        showOverflowTooltip: true
      },
      props.columnAttrs,
      {
        width: props.propertyColumnWidth
      }
    );
  } else {
    return Object.assign(
      {
        align: "center",
        headerAlign: "center",
        showOverflowTooltip: true,
        width: "auto"
      },
      props.columnAttrs
    );
  }
 ```

:::

:::details    转换后的`el-table-column`  ***数据列***  默认属性：

 ```js     
   {
     align: "center",
     headerAlign: "center",
     minWidth: "100",
     showOverflowTooltip: true
   } 
 ```

:::

## 指定转换列

使用 `titleColumnIndex` 这个属性可以指定把第index列行列转换。

:::code pivotTable/pivotTable2.vue

:::

::: tip
`titleColumnIndex`不是一个必填项，在没有传入值的时候会默认去转换第一个非**特殊类型列**
:::

## 插槽：el-table-column 

目前只做了**default** **header**这两个最常用的插槽
:::code pivotTable/pivotTable3.vue

:::

::: warning  💡提示：

1、`scope.row、scope.$index`这些值会随着行列的转换而变化

2、`el-table-column`里带有`type`属性值的特殊类型列，暂不支持任何插槽

:::

## API

::: tip
这里只补充`el-table`表格组件上所没有的内容
:::

### `<属性>` **Attributes**



| 参数名              | 默认值  | 描述说明                                                     | 类型           | 必填 |
| :------------------ | :------ | :----------------------------------------------------------- | :------------- | ---- |
| isTransposed        | `false` | 是否行列转换                                                 | boolean        | 是   |
| propertyColumnLabel | `" "`   | 转换后**属性列**的表头名也就是label                          | string         | 否   |
| propertyColumnWidth | -       | 设置**属性列**的宽度，优先级高于`columnAttrs`里的width       | string\|number | 否   |
| columnAttrs         | `{ }`   | 相当于`el-table-column`上的属性，*仅在转换后生效*，作用于**属性列**和**数据列** | object         | 否   |
| titleColumnIndex    | `0`     | 指定把第index列行列转换                                      | number         | 否   |

### `<方法>` Exposes

| 方法名       | 参数                                  | 描述说明                                                    | 返回值           |
| :----------- | :------------------------------------ | :---------------------------------------------------------- | ---------------- |
| getTransposedData | -                                     | 获取行列转换后的tableData数据 | `Array<object>` |
| getColumnsInfo | -                                     | 获取column列信息                                     | `Array<object>` |
| transposedTableRef | -                                     | 获取转换后的table实例        |`object`|
| tableRef | -    | 获取转换前的table实例                    | `object`        |
| doLayout | -                | 对 Table 进行重新布局                       | `void` |

