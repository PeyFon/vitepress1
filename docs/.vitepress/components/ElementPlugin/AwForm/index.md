# AwForm

AwForm，是一个基于 ElementPlus 的表单插件。适用于在 Vue 单页项目内快速生成表单。组件内部已解决上传附件时，虽然进度已100%但仍未上传完的bug。

## 前置条件

1、ElementPlus组件

2、scss

3、富文本编辑器



## 属性

|   名称   |  类型  | 描述                                                         | 默认值                                             | 是否必填 |
| :------: | :----: | :----------------------------------------------------------- | -------------------------------------------------- | :------: |
| v-model  | object | 双向绑定的值。注：与下方的props、rules、methods通过key相互关联 | { }                                                |    是    |
|  props   | object | 各子表单项属性。注：category为必填项，                       | { }                                                |    是    |
| methods  | object | 各子表单项事件                                               | { }                                                |    否    |
|  rules   | object | 各子表单项所绑定的校验规则                                   | { }                                                |    否    |
| formProp | object | 绑定给form表单的属性，具体内容可参考elementPlus组件内的Form 属性。 | {   "label-width": "auto",   "label-suffix": "："} |    否    |
| formItem | object | 绑定给form-item表单的属性,目前仅有slotNames:['label','error'] | { }                                                |    否    |
| rowProp  | object | grid 布局 row 标签属性。具体内容可参考elementPlus组件内的layout组件内的Row Attributes | gutter: 15                                         |    否    |
| colProp  | object | grid 布局 col 标签属性。具体内容可参考elementPlus组件内的layout组件内的Col Attributes | span: 24                                           |    否    |



## props的结构示例demo

```javascript
  props: {
    text: {
      category: "input",
      label: "要显示的",
      hidden: true //不显示这一子表单项
    },
    autocomplete: {
      category: "autocomplete",
      label: "autocomplete",
      slotNames: ["default", "suffix"],
      "fetch-suggestions": function
    },
    rate: {
      category: "rate",
      label: "评级"
    },
    text1: {
      category: "input",
      label: "text1",
      placeholder: "请输入角色名称",
      slotNames: ["prepend", "append"]
    },
    number: {
      category: "number",
      label: "number",
      placeholder: "请输入角色名称2",
      precision: 2, //这个属性是单独加的，用于控制小数点的位数,默认是整数
      span: 24 //这行代码说明了 props权重大于colProp
    },
    inputNumber: {
      category: "input-number",
      label: "inputNumberinputNumber",
      "controls-position": "right",
      controls: false,
      precision: 0
    },
    textarea: {
      category: "input",
      type: "textarea",
      label: "textarea"
    },
    daterange: {
      category: "date-picker",
      type: "date",
      label: "daterange",
      slotNames: ["default"],
      format: "YYYY/MM/DD",
      "value-format": "YYYY-MM-DD"
      // "range-separator": "至",
      // "start-placeholder": "开始日期",
      // "end-placeholder": "结束日期"
    },
    time: {
      category: "time-picker",
      type: "datetime",
      label: "time",
      "is-range": true,
      "range-separator": "至",
      "start-placeholder": "开始时间",
      "end-placeholder": "结束时间",
      "value-format": "HH:mm:ss",
      span: 12
    },
    timeSelect: {
      category: "time-select",
      label: "time-select"
    },
    select: {
      category: "select",
      label: "select",
      multiple: true,
      slotNames: ["default"],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
          disabled: true
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    },
    selectV2: {
      category: "select-v2",
      label: "select-v2",
      // multiple: true,
      // filterable: true,
      // clearable: true,
      options: options1
    },
    treeSelect: {
      category: "tree-select",
      label: "tree-select",
      multiple: true,
      // filterable: true,
      // clearable: true,
      data: options2
    },
    switch: {
      category: "switch",
      label: "switch",
      "active-color": "#13ce66",
      "inactive-color": "#ff4949",
      "active-text": "后面文本",
      "inactive-text": "前面文本"
    },
    radio: {
      category: "radio",
      label: "radio",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    },
    radioButton: {
      category: "radio-button",
      label: "radio-button",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    },
    checkbox: {
      category: "checkbox",
      label: "checkbox",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "巧克力"
        },
        {
          value: "选项6",
          label: "慕斯蛋糕"
        }
      ]
    },
    checkboxButton: {
      category: "checkbox-button",
      label: "checkbox-button",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "巧克力"
        },
        {
          value: "选项6",
          label: "慕斯蛋糕"
        }
      ]
    },
    cascader: {
      category: "cascader",
      label: "cascader",
      filterable: true,
      props: { multiple: true },
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
        },

        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    },
    cascaderPanel: {
      category: "cascader-panel",
      label: "cascader-panel",
      filterable: true,
      props: { multiple: true },
      span: 24,
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
        },

        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ]
    },
    file: {
      category: "file",
      label: "file",
      // listType: "picture",
      "auto-upload": false,
      action: "https://jsonplaceholder.typicode.com/posts/",
      "file-list": fileList.value,
      headers: { Authorization: localStorage.getItem("token") },
      "on-success": (response, file, fileList) => {
        console.log(response, file, fileList, "上传成功");
        // formProps.model["file"] = proxy.$utils.getFormatFileList(
        //   fileList,
        //   formProps.model["file"]
        // );
      },
      "on-progress": (event, file, fileList) => {},
      slotNames: ["tip", "default", "trigger", "file"]
    },

    sortCustom: {
      category: "custom",
      label: "sortCustom"
    },
    sortCustom2: {
      category: "custom",
      label: "sortCustom2"
    },
    sortCustom3: {
      category: "custom",
      hidden: true
    }
  },
```

## slot插槽

| 名称          | 说明                                                         | 参数                                                       |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| footer | 底部按钮                                                     | {form}                                               |
| custom        | 自定义子表单项，使用时需要先设置formProps.props内的字表单项的category：custom。具体内容请查看下方***调用示例*** | - |

## Methods方法

|    方法名    |                参数                 |     返回值     |                            说明                             |
| :----------: | :---------------------------------: | :------------: | :---------------------------------------------------------: |
| validateForm |                 无                  | Promise<*any*> | promise 异步方法，表单验证成功回调函数 then、失败回调 catch |
|  resetForm   |                 无                  |       无       |                       重置表单的校验                        |
|  getModels   |                 无                  | object：model  |             手动获取form表单所绑定的值(无校验)              |
|  setModels   |               object                |       无       |                  手动修改组件内model里的值                  |
|   getModel   |         key：string\|number         | value：unknown |                   获取model内某个key的值                    |
|   setModel   | key：string\|number，value：unknown |       无       |                   设置model内某个key的值                    |

## 注意事项（全部）

1. props除了当前子表单组件所拥有的属性（这里slot用了slotNames做了层封装），其特有的属性还有： `category、hidden、label、slotNames、precision`以及col组件所拥有的属性
2. props内子表单项的hidden可输入的值：`true、false`。用于隐藏某一子表单项
3. props内子表单项的label是el-form-item需要的label值。
4. 若需要用到***Form Item 插槽***，则插槽名应写为**xxx-form-item-label**或者**xxx--form-item-error**
5. props内子表单项的slotNames可输入的值：[插槽名1，插槽名2，...]。插槽1，插槽2代表了当前子表单项组件自带的插槽名，具体使用查看下方***调用示例***
   注：template里需要写：slot="formProps内props对应的key-子表单项组件自带的插槽名"，例如：slot="text1-prepend"。footerButtons和custom不用遵从这一规则。
6. props内子表单项里可以写入col相关的属性（例如：span：24），由于props权重大于colProp，因此会把原先写在colProp内的对应属性给替换掉，前提条件是它俩写有同样的属性名
7. 当props内的category类型为`file`，且需要tag插槽时，需要先写入` slotNames: ["tip"]`然后在template的aw-form内直接写入插槽`#xxx-tag`
8. 当props内的category类型为`custom`时：
   1. 允许把插槽绑定的值写在v-model内。
   2. custom还能实现1对多的效果，具体内容请查看下方的***拓展***

9. props的key要与model内的key一致

## 拓展

关于**custom**的特殊使用：

 当需要实现在一行el-form-item内绑定多个值的时候可以参考如下：

```vue
<template>
  <div>
    <el-container class="h-100" style="height:100%">
      <div class="panel d-flex-col" style="width:100%;overflow:auto">
        <aw-form
          v-model="formProps.model"
          :props="formProps.props"
          :rules="formProps.rules"
          ref="ownForm"
          :colProp="{
            span: 12
          }"
          :rowProp="{ gutter: 20 }"
        >
          <template slot="sortCustom2">
            这是自定义form拓展2
            <el-select
              v-model="formProp.model.sortCustom2"
              placeholder="请选择2"
              style="width:100px"
            >
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-select
              v-model="formProp.model.sortCustom3"
              placeholder="请选择3"
              style="width:100px"
            >
              <el-option label="餐厅名3" value="1"></el-option>
              <el-option label="订单号3" value="2"></el-option>
              <el-option label="用户电话3" value="3"></el-option>
            </el-select>
          </template>
        </aw-form>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formProps: {
        model: { sortCustom2: "", sortCustom3: "" },
        props: {
          sortCustom2: {
            category: "custom",
            label: "sortCustom2"
          },
          sortCustom3: {
            category: "custom",
            hidden: true
          }
        },
        rules: {
          sortCustom2: [
            //自定义规则
          ]
        }
      }
    };
  }
};
</script>

<style></style>

```





