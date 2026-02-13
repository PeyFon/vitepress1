# AwForm表单



## 基本用法

**`v-model、props、rules、methods`通过key键相互关联**

**options**属性只接受 `value、label、disabled`

注：示例里使用`formProps`包一层仅仅是为了方便开发者找代码。

关于props传参请查看[ `<props>` **Props**](./#props-props)。

由于formProp属性默认有`"label-suffix": "："`因此`label`内可以不用写冒号。

:::code form/form1.vue
:::
::: details 👀 示例内options的disabled说明
AwForm默认只接受disabled字段的禁用，若想自定义请使用插槽`default`重写整个`el-option/el-option-group`

```js
 select1: {
      category: "select",
      label: "选择",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
          disabled: true,// [!code focus]   
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
    },
```
:::
::: warning  💡 提示
表单只渲染props、model的交集部分。

```js {3,6,11}
const formProps = reactive({
  model: {
    input1: null,
  },
  props: {
    input1: {
      category: "input",
      label: "text1",
      placeholder: "请输入名称",
    },
    rate1: {
      category: "rate",
      label: "评级",
    },
  },
});
```
:::

## 布局：行列

`colProp`属性用于控制几列form-item，`rowProp`用于控制每个form-item的间距。

:::code form/form2.vue
:::

::: tip 提示
span的最大值是24，且props内的span权重**大于**`colProp`内的span，[ **查看示例**](./#布局-控制某个表单域占多列)

```js
 props: {
    select1: {
      category: "select",
      label: "选择",
      multiple: true,
      placeholder: "请选择",
      span: 24,// [!code focus]
      options: [],
    },
  },
```

:::



## 布局：底部

使用AwForm的底部插槽，插槽会暴露出form对象

:::code form/form3.vue
:::

## 布局：分隔线

设置`slotNames: ["divide"]`后，组件会默认提供一个分隔线。若想使用别的分隔线方式请看[布局：自定义分隔](./#布局-自定义分隔)

:::code form/form4.vue
:::

## 布局：自定义分隔

通过`slotNames: ["divide"]`来设置自定义分隔，需要在AwForm的template插槽内设置 **#key键-divide**

:::code form/form5.vue
:::

::: info 提示

关于slotNames的具体使用请查看下方的[插槽：ElementPlus组件插槽](./#插槽-elementplus组件插槽)

:::

## 布局：空白分隔

当需要使用一个空白分隔的时候可以使用此方式，它只是**自定义分隔**的一种表现形式而已

:::code form/form6.vue
:::

## 布局：更改表单域标签label

当表单域的标签需要去自定义时的示例，由于要避免将来的插槽重名，因此AwForm的template插槽要写为   **#key键-form-item-label**

:::code form/form7.vue
:::

::: details 关键代码
template部分
```vue
  <template #key键-form-item-label="{ label }">// [!code focus]
    <span style="align-items: center; display: inline-flex">
      <el-tooltip effect="dark" content="提示一些信息" placement="top">
        <el-icon>
          <Info></Info>
        </el-icon>
      </el-tooltip>
      {{ label }}
    </span>
  </template>
```
js部分
```js
const formProps = reactive({
  model:{
    // ...
  },
  props:{
    // ...
  },
  formItem: {
    slotNames: ["label"],// [!code focus]
  },
})
 
```

:::

## 布局：控制某个表单域的显示隐藏

有些业务会根据某个表单域的值的变化去控制另一个表单域的显示隐藏，这时需要设置`hidden:true`

:::code form/form8.vue
:::

## 布局：控制某个表单域占多列

有时候会有某个表单域要占多列的宽，这时需要设置`span`，span最大值24。当一行放不开时会自动另起一行排列

:::code form/form9.vue
:::

## 插槽：自定义组件拓展custom

有时候`category`的类型值不一定会满足需求，此时可以设置`category:"custom"`来自定义form-item要渲染的组件，同时在AwForm的template插槽上写 `#key键`

:::code form/form10.vue
:::

## 插槽：ElementPlus组件插槽

slotNames主要由两部分组成，第一个`divide`在上方已演示[点此查看](./#布局-自定义分隔)，这里着重说明一下ElementPlus组件自带的插槽使用。

示例里使用了el-upload组件，upload内封装了一些默认布局按钮，若不合适可以使用slotNames自定义

:::code form/form11.vue
:::

::: warning 💡 提示
这里的重点在于slotNames里写入了组件的插槽名后，在AwForm的template插槽要写 `#key键-slotNames内的插槽名`
:::
::: info 提示
upload内绑定了一个默认的空样式名，方便在调用的地方写一些样式
```vue
<el-upload
  v-else-if="sProps[name]?.category === 'upload'"
  :ref="name"
  v-bind="getUploadFormAttrs(name)"
  :class="name + '-uploader'" // [!code hl]
  style="width: 100%"
>
</el-upload>
```

:::

## 插槽：el-select组件插槽

修改option的示例，由于el-select未给option定义具体的插槽名，这里自定义了一个option。当想用Option Group的时候需要用default，可以看下方的[综合示例](./#综合示例)

:::code form/form12.vue
:::

## 综合示例：

:::code form/form0.vue
:::



## API

### `<属性>` Attributes

| 属性名   | 默认值                                               | 描述说明                                                     | 类型   | 必填 |
| :------- | :--------------------------------------------------- | :----------------------------------------------------------- | :----- | ---- |
| v-model  | `{ }`                                                | 双向绑定的值。注：与下方的`props、rules、methods`通过key相互关联 | object | 是   |
| props    | `{ }`                                                | 各子表单项属性。其配置选项，具体看下表[ `<props>` **Props**](./#props-props) | object | 是   |
| methods  | `{ }`                                                | 各子表单项事件。其配置与elementPlus组件一致                  | object | 否   |
| rules    | `{ }`                                                | 各子表单项所绑定的校验规则                                   | object | 否   |
| formProp | `{   "label-width": "auto",   "label-suffix": "："}` | 绑定给form表单的属性，具体内容可参考elementPlus组件内的Form 属性。 | object | 否   |
| formItem | `{ }`                                                | 绑定给form-item表单的属性,目前仅有slotNames:`['label','error']`，由于可以设置`category:"custom"`，因此default插槽不会生效 | object | 否   |
| rowProp  | `{gutter: 15}`                                       | grid 布局 row 标签属性。具体内容可参考elementPlus组件内的layout组件内的Row Attributes | object | 否   |
| colProp  | `{span: 24}`                                         | grid 布局 col 标签属性。具体内容可参考elementPlus组件内的layout组件内的Col Attributes | object | 否   |

### `<props>` Props

::: details 👀 `category`说明：

category能输入的值有：

  "autocomplete" | "input" | "number" | "input-number" | "date-picker" | "time-picker" | "select" | "select-v2" | "tree-select" | "switch" | "radio" | "radio-button" | "checkbox" | "cascader" | "checkbox-button" | "cascader-panel" | "rate" | "time-select" | "upload" | "custom"

命名规律：

- 去掉 组件的el-前缀。如：el-input去掉前缀后为 `input`
- 部分ElementPlus组件存在 **group组** 的概念，对于这种组件既要去掉el-前缀也要去掉-group。如：el-radio-group去掉前缀和后缀为 `radio`
- AwForm额外自定义了两种category：`number`和`custom`
  - number本质是对el-input的一层封装，因此它使用el-input的所有配置。同时通过额外的`precision`属性可以控制小数点位数。详细内容请看 [`AwInputNumber`](/examples/inputNumber/)组件
  - custom是一种使用自定义拓展组件插槽的声明。如下：
    ```vue{6-8,17-21}
    <template>
      <aw-form
      v-model="formProps.model"
      :props="formProps.props"
      >
        <template #sortCustom>
          <el-input v-model="formProps.model.sortCustom" placeholder="这是自定义form-item" />
        </template>
      </aw-form>
    </template>
    
    <script setup >
      const formProps = reactive({
      model: {
          sortCustom: null,
        },
        props: {
          sortCustom: {
          category: "custom",
          label: "sortCustom",
          },
        },
      });
    </script>
    ```

:::

::: details 👀 `slotNames`说明：

从category的值可得知form-item要显示的ElementPlus组件，但由于ElementPlus组件有时候会用到它自己的插槽，因此slotNames便用于存储当前所使用的ElementPlus组件的插槽名。

此外AwForm还额外自定义了一个`divide`，它用于分隔form-item表单域。示例：[布局：分隔线](./#布局-分隔线)

:::

| props                 | 类型                                              | 描述说明                                                     | 可选值       | 默认值  |
| :-------------------- | :------------------------------------------------ | :----------------------------------------------------------- | :----------- | ------- |
| category              | `string`                                          | form-item要显示的类型                                        | 看上方说明   | -       |
| label                 | `string`                                          | form-item的label标签名                                       | 可为空       | -       |
| hidden                | `boolean`                                         | 控制当前的form-item是否隐藏                                  | `true/false` | `false` |
| slotNames             | `Array<string>`                                   | 用于配置是否要使用插槽，可输入值由使用的ElementPlus组件插槽名和`divide`组成 | 看上方说明   | -       |
| span                  | `number`                                          | 用于设置当前form-item所占的宽度，它的权重高于`colProp`属性   | 最大24       | -       |
| precision             | `number`                                          | 当使用一些输入数字的组件时需要此项，用于设置小数点位数       | -            | `0`     |
| options               | `Array<{value:any,label:any,[key: string]: any}>` | 当`category`值为一些需要选择的组件时需要此项，用于设置选择项 | -            | -       |
| ElementPlus组件的属性 | -                                                 | 请查看所使用的ElementPlus组件属性                            | -            | -       |

### `<事件>` Events

| 事件名 | 回调参数 | 描述说明 |
| :----- | :------- | :------- |
| 无     |          |          |

### `<方法>` Exposes

::: danger  ❗   警告 

不推荐使用`getModels、setModels、getModel、setModel` ，其仅用于版本兼容，v-model已能实现其功能。它们将在最近的某版本中删除，请尽快更改书写习惯。

:::

| 方法名       | 参数                                  | 描述说明                                                    | 返回值           |
| :----------- | :------------------------------------ | :---------------------------------------------------------- | ---------------- |
| validateForm | -                                     | promise 异步方法，表单验证成功回调函数 then、失败回调 catch | `Promise<any>`   |
| resetForm    | -                                     | 重置表单的校验                                              | -                |
| getModels    | -                                     | 手动获取form表单所绑定的值(**无校验**)                      | `object：model`  |
| setModels    | `object`                              | 手动修改组件内model里的值                                   | -                |
| getModel     | `key：string\|number`                 | 获取model内某个key的值                                      | `value：unknown` |
| setModel     | `key：string\|number，value：unknown` | 设置model内某个key的值                                      | -                |
| awFormRef    |                                       | 绑在`el-form`上的ref实例                                    |                  |

### `<插槽>` Slots

| 插槽名 | 参数     | 描述说明                                                     |
| :----- | :------- | :----------------------------------------------------------- |
| footer | `{form}` | 底部按钮,form即是v-model绑定的对象                           |
| custom | -        | 自定义子表单项，使用时需要先设置props内的字表单项的`category：custom` |

