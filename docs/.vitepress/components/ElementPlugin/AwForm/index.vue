<template>
  <el-form
    ref="awFormRef"
    :model="sModel"
    :rules="allProps.rules"
    v-bind="formProp"
  >
    <el-row v-bind="rowProps">
      <template v-for="(value, name) in sModel" :key="name">
        <el-col
          v-bind="getColProps(name)"
          v-show="!sProps[name]?.hidden && sProps[name]?.category"
        >
          <el-form-item
            :label="sProps[name]?.label"
            :prop="name"
            v-bind="formItem[name] ? formItem[name] : null"
            v-if="sProps[name]?.category"
          >
            <!-- form-item的label插槽 -->
            <template
              #label="label"
              v-if="formItem?.slotNames?.includes('label')"
            >
              <slot :name="name + '-form-item-label'" v-bind="label"></slot>
            </template>
            <!-- form-item的error插槽 -->
            <template
              #error="{ error }"
              v-if="formItem?.slotNames?.includes('error')"
            >
              <slot :name="name + '-form-item-error'" :error="error"></slot>
            </template>
            <!-- autocomplete类型 -->
            <el-autocomplete
              v-if="sProps[name]?.category === 'autocomplete'"
              v-model="sModel[name]"
              v-on="sMethods[name] || {}"
              v-bind="sProps[name]"
              style="width: 100%"
            >
              <template v-if="hasSlotName(name, 'default')" #default="{ item }">
                <slot :name="name + '-default'" :item="item"></slot>
              </template>
              <template
                v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'default')"
                #[slotName]
                :key="slotName"
              >
                <slot :name="name + '-' + slotName"></slot>
              </template>
            </el-autocomplete>
            <!-- input类型 -->
            <el-input
              v-else-if="sProps[name]?.category === 'input'"
              v-model="sModel[name]"
              v-on="sMethods[name] || {}"
              v-bind="sProps[name]"
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
              v-model="sModel[name]"
              v-else-if="sProps[name]?.category === 'number'"
              v-bind="sProps[name]"
              :methods="sMethods[name] || {}"
              :bindName="name"
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
              style="width: 100%"
            >
            </el-input-number>
            <!-- date-picker -->
            <el-date-picker
              v-else-if="sProps[name]?.category === 'date-picker'"
              v-model="sModel[name]"
              v-bind="sProps[name]"
              v-on="sMethods[name] || {}"
              :picker-options="sProps[name].pickerOptions"
              style="width: 100%; display: flex"
            >
              <template v-if="hasSlotName(name, 'default')" #default="cell">
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
              style="width: 100%; display: flex"
            >
            </el-time-picker>
            <!-- select类型 -->
            <el-select
              v-else-if="sProps[name]?.category === 'select'"
              v-model="sModel[name]"
              v-bind="sProps[name]"
              v-on="sMethods[name] || {}"
              style="width: 100%"
            >
              <template
                v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'option')"
                #[slotName]
                :key="slotName"
              >
                <slot :name="name + '-' + slotName"></slot>
              </template>
              <template #default v-if="!hasSlotName(name, 'default')">
                <el-option
                  v-for="option in sProps[name].options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                  :disabled="option?.disabled"
                >
                  <template v-if="hasSlotName(name, 'option')" #default>
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
              style="width: 100%"
            >
              <template v-if="hasSlotName(name, 'default')" #default="{ item }">
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
              style="width: 100%"
            >
              <template
                v-if="hasSlotName(name, 'default')"
                #default="{ node, data }"
              >
                <slot
                  :name="name + '-default'"
                  :node="node"
                  :data="data"
                ></slot>
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
              style="padding: 6px 0"
              v-model="sModel[name]"
              v-bind="sProps[name]"
              v-on="sMethods[name] || {}"
            ></el-switch>
            <!-- radio -->
            <el-radio-group
              v-else-if="sProps[name]?.category === 'radio'"
              v-model="sModel[name]"
              v-bind="sProps[name]"
              v-on="sMethods[name] || {}"
            >
              <el-radio
                v-for="option in sProps[name].options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled || false"
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
            >
              <el-radio-button
                v-for="option in sProps[name].options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled || false"
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
              style="width: 100%"
            >
              <template
                v-if="hasSlotName(name, 'default')"
                #default="{ node, data }"
              >
                <slot
                  :name="name + '-default'"
                  :node="node"
                  :data="data"
                ></slot>
              </template>
              <template
                v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'default')"
                #[slotName]
                :key="slotName"
              >
                <slot :name="name + '-' + slotName"></slot>
              </template>
            </el-cascader>
            <!-- cascader-panel -->
            <el-cascader-panel
              v-else-if="sProps[name]?.category === 'cascader-panel'"
              v-model="sModel[name]"
              v-bind="sProps[name]"
              v-on="sMethods[name] || {}"
              style="width: 100%"
            >
              <template
                v-if="hasSlotName(name, 'default')"
                #default="{ node, data }"
              >
                <slot
                  :name="name + '-default'"
                  :node="node"
                  :data="data"
                ></slot>
              </template>
              <template
                v-for="slotName in sProps[name]?.slotNames?.filter((item: string) => item !== 'default')"
                #[slotName]
                :key="slotName"
              >
                <slot :name="name + '-' + slotName"></slot>
              </template>
            </el-cascader-panel>
            <!-- rate -->
            <el-rate
              style="line-height: normal"
              v-else-if="sProps[name]?.category === 'rate'"
              v-model="sModel[name]"
              v-bind="sProps[name]"
              v-on="sMethods[name] || {}"
            >
            </el-rate>
            <!-- time-select -->
            <el-time-select
              v-else-if="sProps[name]?.category === 'time-select'"
              :ref="name"
              v-model="sModel[name]"
              v-bind="sProps[name]"
              v-on="sMethods[name] || {}"
            >
            </el-time-select>
            <!-- upload类型 -->
            <el-upload
              v-else-if="sProps[name]?.category === 'upload'"
              :ref="name"
              v-bind="getUploadFormAttrs(name)"
              :class="name + '-uploader'"
              style="width: 100%"
            >
              <template #default v-if="!hasSlotName(name, 'trigger')">
                <slot :name="name + '-default'">
                  <Plus
                    size="30"
                    :fill="['var(--el-border-color-darker)']"
                    v-if="sProps[name].listType === 'picture-card'"
                  ></Plus>
                  <el-button v-else type="primary">点击上传</el-button>
                </slot>
              </template>

              <template #file="{ file }" v-if="hasSlotName(name, 'file')">
                <slot :name="name + '-file'" :file="file"></slot>
              </template>
              <template #trigger v-if="hasSlotName(name, 'trigger')">
                <slot :name="name + '-trigger'" :data="[name, sProps[name]]">
                  <div style="text-align: left">
                    <div>
                      <el-button type="primary">选取文件</el-button>
                      <el-button
                        style="margin-left: 10px"
                        type="success"
                        @click.stop="submitUpload(name, sProps[name])"
                      >
                        上传到服务器
                      </el-button>
                    </div>
                  </div>
                </slot>
              </template>

              <template #tip v-if="hasSlotName(name, 'tip')">
                <div class="el-upload__tip">
                  <slot :name="name + '-tip'"></slot>
                  <slot :name="name + '-tag'"></slot>
                </div>
              </template>
            </el-upload>

            <!-- 自定义form拓展 -->
            <slot
              v-else-if="sProps[name]?.category === 'custom'"
              :name="name"
            ></slot>
          </el-form-item>
        </el-col>
        <slot
          v-if="sProps[name]?.slotNames?.includes('divide')"
          :name="name + '-divide'"
        >
          <el-divider> </el-divider>
        </slot>
      </template>
      <el-col v-bind="allProps.colProp" v-if="$slots?.footer">
        <!-- 底部按钮 -->
        <slot name="footer" :form="sModel"> </slot>
      </el-col>
      <!-- </template> -->
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import AwInputNumber from "../AwInputNumber/index.vue";
import { Plus } from "@icon-park/vue-next";
import type {
  FormInstance,
  UploadUserFile,
  UploadProgressEvent,
  UploadFile,
  UploadFiles
} from "element-plus";
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  PropType,
  reactive,
  ref
} from "vue";

// type Category =
//   | "autocomplete"
//   | "input"
//   | "number"
//   | "input-number"
//   | "date-picker"
//   | "time-picker"
//   | "select"
//   | "select-v2"
//   | "tree-select"
//   | "switch"
//   | "radio"
//   | "radio-button"
//   | "checkbox"
//   | "cascader"
//   | "checkbox-button"
//   | "cascader-panel"
//   | "rate"
//   | "time-select"
//   | "upload"
//   | "custom";
interface IElProp {
  category: string;
  label?: string;
  hidden?: boolean;
  options?: Array<any>;
  slotNames?: Array<string>;
  [key: string | number | symbol]: any;
}

interface IProps {
  [key: string | number | symbol]: IElProp;
}
// type Model = typeof allProps.modelValue;

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
  formProp: {
    type: Object,
    default: () => ({
      "label-width": "auto",
      "label-suffix": "："
    })
  },
  formItem: {
    type: Object,
    default: () => ({})
  },
  rowProp: {
    type: Object,
    default: () => ({
      gutter: 15
    })
  },
  colProp: {
    type: Object,
    default: () => ({
      span: 24
    })
  }
});
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const emit = defineEmits(["update:modelValue"]);
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
const rowProps = Object.assign({}, allProps.rowProp, { gutter: 15 });
const awFormRef = ref<FormInstance>();

// 处理col 注：sProps[name]内el-col属性权重大于colProp
function getColProps(name: string | number) {
  const colProp = { ...allProps.colProp };
  const selfProp = sProps[name];
  const selfPropKeys = Object.keys(selfProp ? selfProp : []);
  Object.keys(colProp).forEach(key => {
    if (selfPropKeys.includes(key)) {
      colProp[key] = selfProp[key];
    }
  });
  return colProp;
}

// upload 手动上传
function submitUpload(refName: string | number, prop: IElProp) {
  if (prop.onSubmit) {
    prop.onSubmit(prop["file-list"]).then(() => {
      prop["file-list"].forEach((file: UploadUserFile) => {
        file.status = "success";
        file.percentage = 100;
      });
    });
    return false;
  }
  proxy.$refs[refName][0].submit();
}
//处理上传附件的进度条解决进度100%时未上传完的问题
function _handleFileProgress(file: UploadFile) {
  const allProgress = document.querySelectorAll(".el-progress__text");
  allProgress?.forEach(item => {
    if (file.status === "uploading" && parseFloat(item.innerHTML) >= 95) {
      item.innerHTML = "99%";
    }
  });
}
// upload类型表单-on事件绑定处理
function getUploadFormAttrs(name: string | number) {
  const mergeProps = Object.assign({}, sProps[name]);
  mergeProps["on-progress"] = (
    event: UploadProgressEvent,
    file: UploadFile,
    fileList: UploadFiles
  ) => {
    _handleFileProgress(file);
    typeof sProps[name]["on-progress"] === "function" &&
      sProps[name]["on-progress"](event, file, fileList);
  };
  return mergeProps;
}

// 重置
function resetForm() {
  const allProps = Object.values(sProps);
  allProps.forEach(prop => {
    if (prop.category === "upload") {
      prop["file-list"] = [];
    }
  });
  awFormRef.value?.resetFields();
}

// form验证
function validateForm(): Promise<any> {
  return new Promise((resolve, reject) => {
    awFormRef.value?.validate(valid => {
      valid ? resolve(sModel.value) : reject(valid);
    });
  });
}
// 获取整个model值
function getModels() {
  return sModel.value;
}
// 获取model某个值
function getModel(key: string | number) {
  return sModel.value[key];
}
// 批量修改model值
function setModels(obj: object) {
  for (const [key, value] of Object.entries(obj)) {
    sModel.value[key] = value;
  }
}
// 修改model某个值
function setModel(key: string | number, value: unknown) {
  sModel.value[key] = value;
}

function hasSlotName(propName: string, slotName: string): boolean {
  return sProps[propName]?.slotNames?.includes(slotName);
}
defineExpose({
  awFormRef,
  validateForm,
  resetForm,
  getModels,
  getModel,
  setModels,
  setModel
});
</script>
<script lang="ts">
export default {
  name: "AwForm"
};
</script>

<style lang="scss" scoped>
:deep(.el-upload__tip) {
  margin-top: 0;
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

:deep(.el-upload-list__item .el-progress__text) {
  display: none;
}

:deep(.el-radio-group label.el-radio) {
  line-height: 2.4 !important;
}

:deep(.el-range-separator) {
  width: auto !important;
}
</style>
