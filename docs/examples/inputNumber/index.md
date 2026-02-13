# AwInputNumber组件

对`el-input`的二次封装，处理了`el-input`不生效的`maxlength、min、max`属性，默认是整数，若要修改请设置`precision`属性
## 基本用法

示例里使用了change事件

:::code inputNumber/inputNumber0.vue

:::

## API

::: danger 💡change事件说明

change事件自带的参数不要使用，因为max或min会使其不准确，请用`v-model`绑定的值

:::

### `<属性>` Props

| 参数名    | 默认值 | 描述说明     | 类型   | 必填 |
| :-------- | :----- | :----------- | :----- | ---- |
| maxlength | `16`   | 最大长度     | number | 否   |
| min       | -      | 最小值       | number | 否   |
| max       | -      | 最大值       | number | 否   |
| precision | 0      | 小数位数精度 | number | 否   |



