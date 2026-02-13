<template>
  <el-table-column v-if="getVisible" v-bind="$attrs">
    <template #header="{ column, $index }">
      <div @click.stop="() => false" class="d-flex" :key="prop">
        <span>{{ $attrs.label }}</span>
        <!-- input -->
        <template v-if="searchFilter.category === 'input'">
          <el-popover :ref="prop" width="auto" trigger="click">
            <div class="d-flex">
              <el-input
                style="width: 200px"
                v-model="val1"
                v-bind="attrs"
                v-on="searchFilter.methods || {}"
                @keyup.enter="emitChange"
                @clear="emitChange"
              ></el-input>
              <el-button
                style="margin-left: 5px"
                type="primary"
                @click="emitChange"
                :icon="Search"
              ></el-button>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Search />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- radio -->
        <template v-else-if="searchFilter.category === 'radio'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <el-radio-group
              class="radio-flex"
              v-model="val1"
              v-bind="attrs"
              v-on="searchFilter.methods || {}"
            >
              <el-radio
                :value="item.value"
                :disabled="item?.disabled"
                v-for="item in optionsArr"
                :key="item.label"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
            <div class="radio-btn-flex">
              <el-button
                type="primary"
                @click="emitChange"
                link
                style="margin-left: 10px"
              >
                筛选
              </el-button>
              <el-button
                type="info"
                link
                @click="resetChange"
                :disabled="isDisabled"
              >
                重置
              </el-button>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Down />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- checkbox -->
        <template v-else-if="searchFilter.category === 'checkbox'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <el-checkbox-group
              class="radio-flex"
              v-model="val1"
              v-bind="attrs"
              v-on="searchFilter.methods || {}"
            >
              <el-checkbox
                :value="item.value"
                :disabled="item?.disabled"
                v-for="item in optionsArr"
                :key="item.label"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
            <div class="radio-btn-flex">
              <el-button
                type="primary"
                @click="emitChange"
                link
                style="margin-left: 10px"
              >
                筛选
              </el-button>
              <el-button
                type="info"
                link
                @click="resetChange"
                :disabled="isDisabled"
              >
                重置
              </el-button>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Down />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- select  -->
        <template v-else-if="searchFilter.category === 'select'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <div class="d-flex">
              <el-select
                :teleported="false"
                v-model="val1"
                v-bind="attrs"
                v-on="searchFilter.methods || {}"
                style="width: 240px"
              >
                <el-option
                  :label="item.label"
                  :disabled="item?.disabled"
                  v-for="item in optionsArr"
                  :key="item.label"
                  :value="item.value"
                />
              </el-select>

              <el-button
                type="primary"
                @click="emitChange"
                link
                style="margin-left: 10px"
              >
                筛选
              </el-button>
              <el-button
                type="info"
                link
                @click="resetChange"
                :disabled="isDisabled"
              >
                重置
              </el-button>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Down />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- cascader  -->
        <template v-else-if="searchFilter.category === 'cascader'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <div class="d-flex">
              <el-cascader
                :teleported="false"
                v-model="val1"
                v-bind="attrs"
                v-on="searchFilter.methods || {}"
                :key="Number(cascaderKey)"
              ></el-cascader>
              <el-button
                type="primary"
                @click="emitChange"
                link
                style="margin-left: 10px"
              >
                筛选
              </el-button>
              <el-button
                type="info"
                link
                @click="resetChange"
                :disabled="isDisabled"
              >
                重置
              </el-button>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Down />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- date-picker -->
        <template v-else-if="searchFilter.category === 'date-picker'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <div class="d-flex">
              <el-date-picker
                :teleported="false"
                v-model="val1"
                v-bind="attrs"
                v-on="searchFilter.methods || {}"
                @change="emitChange"
              ></el-date-picker>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Calendar />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- time-picker -->
        <template v-else-if="searchFilter.category === 'time-picker'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <div class="d-flex">
              <el-time-picker
                :teleported="false"
                v-model="val1"
                v-bind="attrs"
                v-on="searchFilter.methods || {}"
                @change="emitChange"
              ></el-time-picker>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Time />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- time-select -->
        <template v-else-if="searchFilter.category === 'time-select'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <div class="d-flex">
              <el-time-select
                v-model="val1"
                v-bind="attrs"
                v-on="searchFilter.methods || {}"
                @change="emitChange"
              ></el-time-select>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Time />
              </i>
            </template>
          </el-popover>
        </template>
        <!-- custom -->
        <template v-else-if="searchFilter.category === 'custom'">
          <el-popover trigger="click" :ref="prop" width="auto">
            <div class="d-flex">
              <slot
                name="header"
                :value="val1"
                :column="column"
                :$index="$index"
              ></slot>
            </div>
            <template #reference>
              <i
                class="cursor-point"
                :class="isEmpty() ? '' : 'filtered-color'"
              >
                <Find />
              </i>
            </template>
          </el-popover>
        </template>
      </div>
    </template>
    <!-- 同时存在slot与formatter时，formatter优先 -->
    <template v-slot="scope" v-if="!$attrs.formatter">
      <slot
        :row="scope.row"
        :$index="scope.$index"
        :value="
          ['select', 'checkbox', 'radio'].includes(searchFilter.category)
            ? getCellValue(scope.row[prop])
            : scope.row[prop]
        "
      >
        <span
          v-if="['select', 'checkbox', 'radio'].includes(searchFilter.category)"
        >
          {{
            getCellValue(scope.row[prop])
              .map((option: any) => option.label)
              .toString() || scope.row[prop]
          }}
        </span>
        <span v-else-if="searchFilter.category === 'cascader'">
          <el-cascader
            class="readonly-cascader"
            v-model="scope.row[prop]"
            v-bind="attrs"
            :disabled="true"
            :key="Number(cascaderKey)"
          ></el-cascader>
        </span>
        <span v-else>
          {{ scope.row[prop] }}
        </span>
      </slot>
    </template>
  </el-table-column>
</template>
<script lang="ts" setup>
import { getDataType } from "../utils";
import { Down, Search, Calendar, Time, Find } from "@icon-park/vue-next";
import type { PopoverInstance } from "element-plus";
import {
  computed,
  getCurrentInstance,
  PropType,
  ref,
  shallowRef,
  useAttrs,
  watch
} from "vue";
import type { ComponentInternalInstance } from "vue";

interface ISearchFilter {
  category:
    | "input"
    | "radio"
    | "checkbox"
    | "select"
    | "cascader"
    | "date-picker"
    | "time-picker"
    | "time-select"
    | "custom";
  attrs?: { options?: Array<any>; [key: string | number]: unknown };
  methods?: object;
  empty?: unknown;
}
const prop = useAttrs().prop as string;
const allProps = defineProps({
  /**筛选表单配置*/
  searchFilter: {
    type: Object as PropType<ISearchFilter>,
    required: true
  },
  /**筛选value值*/
  modelValue: {
    required: true
  },
  /**是否显示列*/
  visible: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["update:modelValue", "searchCallback"]);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const val1 = shallowRef<any>(allProps.modelValue);

const optionsArr = ref<any[]>([]);
function _getAttrs() {
  const searchAttrs = _searchFilter.value?.attrs ?? {};
  if (_searchFilter.value.category === "input") {
    return Object.assign(
      {
        placeholder: "",
        clearable: true
      },
      searchAttrs
    );
  }
  if (["select", "radio", "checkbox"].includes(_searchFilter.value.category)) {
    //抽离出options作为一个单独的数组optionsArr
    const newProp = Object.assign({}, searchAttrs);
    optionsArr.value = searchAttrs?.options ?? [];
    Reflect.deleteProperty(newProp, "options");
    return newProp;
  }

  if (_searchFilter.value.category === "cascader") {
    return Object.assign(
      {
        placeholder: "",
        options: []
      },
      searchAttrs
    );
  }

  return Object.assign({}, searchAttrs);
}
const _searchFilter = computed(() => allProps.searchFilter);
const attrs = ref(_getAttrs());
const cascaderKey = ref(false);
function getCellValue(value: any) {
  const type = getDataType(value);
  if (type === "Array") {
    return value.map((val: string | number | boolean) => {
      const option = optionsArr.value.find(item => item.value === val);
      return option;
    });
  } else {
    const option = optionsArr.value.find(item => item.value === value);
    return option ? [option] : [];
  }
}
const isDisabled = computed(() => {
  const valueType = getDataType(val1.value);

  if (
    ["Boolean", "Number"].includes(valueType) ||
    (valueType === "Array" && (val1.value as [any])?.length) ||
    (valueType === "String" && val1.value)
  ) {
    return false;
  } else {
    return true;
  }
});
function isEmpty() {
  const emptyMap = ["[]", ",", "", "undefined", "null"];
  if (_searchFilter.value.empty) {
    emptyMap.push(_searchFilter.value.empty + "");
  }

  return emptyMap.includes(allProps.modelValue + "");
}
function emitChange() {
  let emptyValue = val1.value;
  if (_searchFilter.value.empty && emptyValue === "") {
    emptyValue = _searchFilter.value.empty;
  }
  emit("update:modelValue", emptyValue);
  emit("searchCallback", emptyValue);
  //手动触发一下隐藏
  closePopover();
}
function resetChange() {
  if (["checkbox", "cascader"].includes(_searchFilter.value.category)) {
    val1.value = [];
  } else {
    // 这里 单选 查全部的数据传 null 给后端
    val1.value = null;
  }
  emitChange();
}
const getVisible = computed(() => {
  const columnsArr = proxy?.$parent?.$attrs?.columnsArr as Array<{
    prop: string;
    visible: boolean;
    [key: string]: unknown;
  }>;
  if (columnsArr?.length) {
    //与列的排序隐藏组件配合使用
    for (let i = 0; i < columnsArr.length; i++) {
      if (columnsArr[i].prop === prop) {
        return columnsArr[i].visible;
      }
    }
    return;
  } else {
    return allProps.visible;
  }
});
function closePopover() {
  const popoverRef = proxy.$refs[prop] as PopoverInstance;
  popoverRef.hide();
}
watch(
  () => _searchFilter.value?.attrs,
  val => {
    if (val?.options) {
      attrs.value = _getAttrs();
      if (_searchFilter.value.category === "cascader") {
        cascaderKey.value = !cascaderKey.value;
      }
    }
  }
);
defineExpose({ closePopover });
</script>
<script lang="ts">
export default {
  name: "AwTableColumnSearch"
};
</script>

<style lang="scss" scoped>
.d-flex {
  display: inline-flex;
  align-items: center;
}

.cursor-point {
  cursor: pointer;
  color: #bfbfbf;
  padding: 3px;
  outline: none;
}
.cursor-point:not(.filtered-color):hover {
  color: #7e7e7e;
}
.cursor-point.filtered-color {
  color: var(--el-color-primary);
  font-weight: bold;
  transform: scale(1.1);
}
.radio-flex {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.radio-btn-flex {
  border-top: 1px solid #dcdfe6;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}

:deep(.readonly-cascader input) {
  border: 0;
  background-color: inherit !important;
  color: inherit !important;
  cursor: auto !important;
  padding-left: 0;
}
:deep(.readonly-cascader .el-input__suffix) {
  display: none;
}
</style>
