<template>
  <div class="d-flex-row" id="divId">
    <el-form
      :model="sModel"
      :rules="allProps.rules"
      v-bind="sFormProp"
      ref="awSearchQueryRef"
      class="form-item"
      :inline="true"
    >
      <template v-for="(value, name, index) in sModel">
        <el-form-item
          class="item"
          :key="name"
          :label="sProps[name]?.label"
          :prop="name"
          v-if="
            (index > columnNum ? showSearchAll : true) && sProps[name]?.category
          "
        >
          <!-- input类型 -->
          <el-input
            :style="{ width: inputWidth + 'px' }"
            v-if="sProps[name]?.category === 'input'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
          >
            <template
              v-for="slotName in sProps[name]?.slotNames"
              #[slotName]
              :key="slotName"
            >
              <slot :name="name + '-' + slotName"></slot>
            </template>
          </el-input>
          <!-- number类型 -->
          <aw-input-number
            v-else-if="sProps[name]?.category === 'number'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            :methods="sMethods[name] || {}"
            :bindName="name"
            :style="{ width: inputWidth + 'px' }"
          >
            <template
              v-for="slotName in sProps[name].slotNames"
              :key="slotName"
              #[`${name}-${slotName}`]
            >
              <slot :name="name + '-' + slotName"></slot>
            </template>
          </aw-input-number>
          <!-- input-number类型 -->
          <el-input-number
            v-else-if="sProps[name]?.category === 'input-number'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          ></el-input-number>

          <!-- date-picker -->
          <el-date-picker
            v-else-if="sProps[name]?.category === 'date-picker'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :picker-options="sProps[name].pickerOptions"
            :style="{ width: inputWidth + 'px' }"
            style="display: flex"
          >
            <template
              v-if="sProps[name]?.slotNames?.includes('default')"
              #default="cell"
            >
              <slot :name="name + '-default'" v-bind="cell"></slot>
            </template>
            <template
              v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'default')"
              #[slotName]
              :key="slotName"
            >
              <slot :name="name + '-' + slotName"></slot>
            </template>
          </el-date-picker>
          <!-- time-picker -->
          <el-time-picker
            v-else-if="sProps[name]?.category === 'time-picker'"
            :ref="name"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
            style="display: flex"
          >
          </el-time-picker>
          <!-- select类型 -->
          <el-select
            v-else-if="sProps[name]?.category === 'select'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
            <template
              v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'option')"
              #[slotName]
              :key="slotName"
            >
              <slot :name="name + '-' + slotName"></slot>
            </template>
            <template
              #default
              v-if="!sProps[name]?.slotNames?.includes('default')"
            >
              <el-option
                v-for="option in sProps[name].options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
                :disabled="option?.disabled"
              >
                <template
                  v-if="sProps[name]?.slotNames?.includes('option')"
                  #default
                >
                  <slot :name="name + '-option'" :option="option"></slot>
                </template>
              </el-option>
            </template>
          </el-select>
          <!-- select-v2类型 -->
          <el-select-v2
            v-else-if="sProps[name]?.category === 'select-v2'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
            <template
              v-if="sProps[name]?.slotNames?.includes('default')"
              #default="{ item }"
            >
              <slot :name="name + '-default'" :item="item"></slot>
            </template>
            <template
              v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'default')"
              #[slotName]
              :key="slotName"
            >
              <slot :name="name + '-' + slotName"></slot>
            </template>
          </el-select-v2>
          <!-- tree-select -->
          <el-tree-select
            :ref="name"
            v-else-if="sProps[name]?.category === 'tree-select'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
            <template
              v-if="sProps[name]?.slotNames?.includes('default')"
              #default="{ node, data }"
            >
              <slot :name="name + '-default'" :node="node" :data="data"></slot>
            </template>
            <template
              v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'default')"
              #[slotName]
              :key="slotName"
            >
              <slot :name="name + '-' + slotName"></slot>
            </template>
          </el-tree-select>
          <!-- switch -->
          <el-switch
            v-else-if="sProps[name]?.category === 'switch'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          ></el-switch>
          <!-- radio -->
          <el-radio-group
            v-else-if="sProps[name]?.category === 'radio'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
            <el-radio
              v-for="option in sProps[name].options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </el-radio>
          </el-radio-group>
          <!-- radio-button -->
          <el-radio-group
            v-else-if="sProps[name]?.category === 'radio-button'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
            <el-radio-button
              v-for="option in sProps[name].options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </el-radio-button>
          </el-radio-group>
          <!-- checkbox -->
          <el-checkbox-group
            v-else-if="sProps[name]?.category === 'checkbox'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
            <el-checkbox
              v-for="option in sProps[name].options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled || false"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
          <!-- checkbox-button -->
          <el-checkbox-group
            v-else-if="sProps[name]?.category === 'checkbox-button'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
            <el-checkbox-button
              v-for="option in sProps[name].options"
              :key="option.value"
              :value="option.value"
              :disabled="option.disabled || false"
            >
              {{ option.label }}
            </el-checkbox-button>
          </el-checkbox-group>
          <!-- cascader -->
          <el-cascader
            v-else-if="sProps[name]?.category === 'cascader'"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
            class="w-100"
          >
            <template
              v-if="sProps[name]?.slotNames?.includes('default')"
              #default="{ node, data }"
            >
              <slot :name="name + '-default'" :node="node" :data="data"></slot>
            </template>
            <template
              v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'default')"
              #[slotName]
              :key="slotName"
            >
              <slot :name="name + '-' + slotName"></slot>
            </template>
          </el-cascader>
          <!-- time-select -->
          <el-time-select
            v-else-if="sProps[name]?.category === 'time-select'"
            :ref="name"
            v-model="sModel[name]"
            v-bind="sProps[name]"
            v-on="sMethods[name] || {}"
            :style="{ width: inputWidth + 'px' }"
          >
          </el-time-select>
          <!-- 自定义form拓展 -->
          <slot
            v-else-if="sProps[name]?.category === 'custom'"
            :name="name"
          ></slot>
        </el-form-item>
      </template>
      <div
        v-if="canShowItems?.length % 2 === 0"
        :style="{ width: virtualWidth + 'px' }"
      ></div>
      <div
        class="right"
        :style="{
          width: showSearchAll ? buttonWidth + 'px' : 'auto',
          'margin-left': getButtonMargin
        }"
      >
        <div class="button">
          <span class="my-collapse" @click="showSearchAll = !showSearchAll">
            <el-icon :size="16" style="vertical-align: middle">
              <DoubleUp
                v-if="showSearchAll"
                style="display: inline-block"
              ></DoubleUp>
              <DoubleDown v-else style="display: inline-block"></DoubleDown>
            </el-icon>
            <span class="text">{{ showSearchAll ? "收起" : "展开" }}</span>
          </span>
          <el-button type="primary" @click="validateForm">搜索</el-button>
          <el-button @click="resetForm" style="margin-right: 10px">
            重置
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import AwInputNumber from "../AwInputNumber/index.vue";
import type { FormInstance } from "element-plus";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
  watchEffect
} from "vue";
import { DoubleDown, DoubleUp } from "@icon-park/vue-next";
interface IElProp {
  category: string;
  label?: string;
  hidden?: boolean;
  options?: Array<any>;
  [key: string | number | symbol]: any;
}
interface IProps {
  [key: string | number | symbol]: IElProp;
}
const allProps = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  props: {
    type: Object as PropType<IProps>,
    default: () => ({})
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  methods: {
    type: Object,
    default: () => ({})
  },
  inputWidth: {
    type: Number,
    default: 300
  },
  formProp: {
    type: Object,
    default: () => ({
      "label-width": "120px",
      "label-suffix": "："
    })
  }
});
const emit = defineEmits(["update:modelValue", "resetSearch", "getSearchData"]);
const sModel = computed({
  get() {
    return allProps.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});
const sProps = reactive(allProps.props);
const sMethods = reactive(allProps.methods);
const sFormProp = reactive(
  Object.assign(
    { "label-width": "120px", "label-suffix": "：" },
    allProps.formProp
  )
);
const virtualWidth = computed(() => {
  const labelWidth =
    typeof sFormProp["label-width"] === "string"
      ? Number(sFormProp["label-width"].slice(0, -2))
      : Number(sFormProp["label-width"]);

  if (showSearchAll.value) {
    return allProps.inputWidth + labelWidth + 10; //+10是因为margin-right
  } else {
    return 0;
  }
});
const canShowItems = computed(() => {
  const modelArr = Object.keys(sModel.value);
  const propsArr = Object.keys(sProps);
  let inArr;
  if (modelArr.length < propsArr.length) {
    inArr = propsArr.filter(item => modelArr.includes(item));
  } else {
    inArr = modelArr.filter(item => propsArr.includes(item));
  }
  return inArr;
});

const awSearchQueryRef = ref<FormInstance>();

//计算宽度
let screenWidth = ref(document.documentElement.clientWidth);
const showSearchAll = ref(false);
const columnNum = ref(2);
const buttonWidth = ref(0);
const getButtonMargin = computed(() => {
  if (showSearchAll.value) {
    let val = Object.keys(sModel.value).length % 4 == 0 ? "auto" : "inherit";
    return val;
  } else {
    return "inherit";
  }
});
watchEffect(() => {
  const labelWidth =
    typeof sFormProp["label-width"] === "string"
      ? Number(sFormProp["label-width"].slice(0, -2))
      : Number(sFormProp["label-width"]);
  buttonWidth.value = allProps.inputWidth + labelWidth + 10; //+10是因为margin-right
});

watch(
  screenWidth,
  () => {
    const oIframe = document.getElementById("divId") as HTMLElement;
    const item = document.querySelector(".item") as Element;
    // console.log(oIframe.offsetWidth,  item.offsetWidth, "宽度");
    // console.log((oIframe.offsetWidth - 202) / (item.offsetWidth + 10));
    columnNum.value =
      Math.floor((oIframe.offsetWidth - 202) / (item["offsetWidth"] + 10)) - 1;
    if (columnNum.value < 1) {
      columnNum.value = 0;
    }
  },
  { deep: true }
);
onMounted(() => {
  window.onresize = () => {
    // 定义窗口大小变更通知事件
    screenWidth.value = document.documentElement.clientWidth; //窗口宽度
  };
});

// 重置
function resetForm() {
  awSearchQueryRef.value.resetFields();
  emit("resetSearch", sModel.value);
}
// form验证
function validateForm() {
  awSearchQueryRef.value.validate(valid => {
    if (valid) {
      emit("getSearchData", { ...sModel.value });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
}
onBeforeUnmount(() => {
  awSearchQueryRef.value.resetFields();
});
defineExpose({ awSearchQueryRef });
</script>
<script lang="ts">
export default {
  name: "AwSearchQuery"
};
</script>
<style lang="scss" scoped>
:deep(.el-radio-group label.el-radio) {
  line-height: 2.4 !important;
}
:deep(.el-range-separator) {
  width: auto !important;
}
.w-100 {
  width: 100%;
}
.d-flex-row {
  display: flex;
  flex-direction: row;
}
:deep(.el-input-group) {
  display: flex;
  .el-input-group__append,
  .el-input-group__prepend {
    width: auto;
    display: flex;
    align-items: center;
    > * {
      margin-top: 0;
    }
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.my-collapse {
  width: 70px;
  cursor: pointer;
  color: var(--el-color-primary);
  font-size: 12px;
  padding-right: 20px;
  text-align: center;
  .text {
    padding-left: 4px;
  }
}
.item:last-child {
  flex-grow: 1;
}
.form-item {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap; /*// justify-content: flex-start;*/
  width: 100%;
}
:deep(.el-form--inline .el-form-item) {
  margin-right: 10px;
}
</style>
