<template>
  <el-input
    ref="awInputRef"
    v-model="sModel"
    @change="handleStrToNum"
    @input="val => formatNumber(val, bindProps.precision)"
    v-on="methods"
    v-bind="bindProps"
  >
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="bindName + '-' + slotName" v-if="bindName"></slot>
      <slot :name="slotName" v-else></slot>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { InputInstance } from "element-plus";
import { computed, ref, shallowRef, useAttrs, useSlots, watch } from "vue";

interface IBindProps {
  max?: number | undefined;
  min?: number | undefined;
  maxlength?: number;
  precision?: number;
  slotNames?: Array<string>;
  [key: string | number | symbol]: any;
}
const props = defineProps({
  modelValue: {
    type: null,
    default: undefined,
  },
  /**用于复杂业务组件绑定functions*/
  methods: {
    type: Object,
    default: () => ({}),
  },
  /**用于复杂业务组件，生成唯一的slotName*/
  bindName: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);
const sModel = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const awInputRef = ref<InputInstance>();
const attrs = useAttrs();
const bindProps = ref<IBindProps>({ precision: 0, maxlength: 16 });
const sMax = shallowRef<number | undefined>(bindProps.value?.max);
const sMin = shallowRef<number | undefined>(bindProps.value?.min);
const slotNames = shallowRef(bindProps.value?.slotNames);
watch(
  () => Object.keys(attrs),
  () => {
    bindProps.value = Object.assign({ precision: 0, maxlength: 16 }, attrs);
    sMax.value = bindProps.value?.max;
    sMin.value = bindProps.value?.min;
    slotNames.value = bindProps.value?.slotNames?.length
      ? bindProps.value?.slotNames
      : Object.keys(useSlots());
    Reflect.deleteProperty(bindProps.value, "max");
    Reflect.deleteProperty(bindProps.value, "min");
  },
  { deep: true, immediate: true }
);

function formatNumber(value: string, precision = 0) {
  const hasMinus = String(value.charAt(0) === "-");
  const numberValue = value
    .replace(/[^\d.]/g, "")
    .replace(new RegExp(`\\.{${precision},}`, "g"), ".")
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".")
    .replace(new RegExp(`^(-)*(\\d+)\\.(\\d{${precision},}).*$`), "$1$2.$3")
    .replace(/^\./g, "");

  const minusMap = { true: "-", false: "" };
  const floatValue = parseFloat(minusMap[hasMinus] + numberValue);

  if (isNaN(floatValue) && minusMap[hasMinus]) {
    sModel.value = minusMap[hasMinus];
    return;
  }

  const splitArray = numberValue.split(".");
  let strNumber = minusMap[hasMinus] + numberValue;
  if (splitArray.length > 1) {
    const fixedStr = precision
      ? splitArray[1].substring(0, precision)
      : splitArray[1];
    if (splitArray.length > precision) {
      strNumber = minusMap[hasMinus] + splitArray[0] + "." + fixedStr;
    } else {
      fixedStr &&
        (strNumber = minusMap[hasMinus] + splitArray[0] + "." + fixedStr);
    }
  } else {
    strNumber = minusMap[hasMinus] + numberValue;
  }

  sModel.value = strNumber;
}
function handleStrToNum(value) {
  let number = isNaN(parseFloat(String(value)))
    ? undefined
    : parseFloat(String(value));
  if (number !== undefined) {
    sMax.value !== undefined && number >= sMax.value
      ? (number = sMax.value)
      : number;
    sMin.value !== undefined && number <= sMin.value
      ? (number = sMin.value)
      : number;
  } else {
    sMin.value !== undefined && (number = sMin.value);
  }
  sModel.value = number;
}
defineExpose({ awInputRef });
</script>
<script lang="ts">
export default {
  name: "AwInputNumber",
  inheritAttrs: false,
};
</script>
<style lang="scss" scoped></style>
