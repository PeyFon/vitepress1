<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @cell-click="columnClik"
      ref="awTableRef"
      v-bind="sTableProps"
    >
      <template #empty>
        <slot name="empty"></slot>
      </template>
      <template #append>
        <slot name="append"></slot>
      </template>

      <slot name="identifier"></slot>

      <el-table-column
        v-for="(item, index) in columns.filter(column => !column.hidden)"
        v-bind="item"
        :key="item.prop"
      >
        <template v-slot:header>
          <slot :name="`${item.prop}-header`" :label="item.label">{{
            item.label
          }}</slot>
        </template>
        <template #default="scope">
          <div
            @click.stop="() => false"
            v-if="isEditShow(scope.row, scope.$index, item.prop)"
          >
            <el-input
              v-if="sProps[item.prop]?.category === 'input'"
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
            >
            </el-input>

            <aw-input-number
              v-model="scope.row[item.prop]"
              v-else-if="sProps[item.prop]?.category === 'number'"
              v-bind="sProps[item.prop]"
              :methods="sMethods[item.prop] || {}"
              :bindName="item.prop"
            >
              <template
                v-for="slotName in sProps[item.prop].slotNames"
                :key="slotName"
                #[`${item.prop}-${slotName}`]
              >
                <slot :name="item.prop + '-' + slotName"></slot>
              </template>
            </aw-input-number>
            <!-- input-number类型 -->
            <el-input-number
              v-model="scope.row[item.prop]"
              v-else-if="sProps[item.prop]?.category === 'input-number'"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
            >
            </el-input-number>
            <el-date-picker
              v-else-if="sProps[item.prop]?.category === 'date-picker'"
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
              style="width: 100%; display: flex"
            >
            </el-date-picker>
            <el-time-picker
              v-else-if="sProps[item.prop]?.category === 'time-picker'"
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
              style="width: 100%; display: flex"
            >
            </el-time-picker>
            <el-select
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
              v-else-if="sProps[item.prop]?.category === 'select'"
              style="width: 100%"
            >
              <template
                v-for="slotName in sProps[item.prop]?.slotNames?.filter((item: string) => item !== 'option')"
                #[slotName]
                :key="slotName"
              >
                <slot :name="item.prop + '-' + slotName"></slot>
              </template>
              <template
                #default
                v-if="!sProps[item.prop]?.slotNames?.includes('default')"
              >
                <el-option
                  v-for="option in sProps[item.prop].options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                  :disabled="option?.disabled"
                >
                  <template
                    v-if="sProps[item.prop]?.slotNames?.includes('option')"
                    #default
                  >
                    <slot :name="item.prop + '-option'" :option="option"></slot>
                  </template>
                </el-option>
              </template>
            </el-select>
            <template v-else-if="sProps[item.prop]?.category === 'tag'">
              <el-tag
                v-for="(tag, index) in scope.row[item.prop]"
                :key="index + tag"
                v-bind="sProps[item.prop]"
                v-on="getTagMethods(tag, scope.row[item.prop], item.prop) || {}"
                class="m-x-2"
              >
                {{ tag || "" }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputTagVisible"
                v-model="inputTagValue"
                :ref="el => (saveInputTagRef = el)"
                :size="sProps[item.prop].size"
                @keyup.enter="handleInputTagConfirm(scope.row[item.prop])"
                @blur="handleInputTagConfirm(scope.row[item.prop])"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                :size="sProps[item.prop].size"
                @click="showInputTag"
                >添加</el-button
              >
            </template>

            <el-switch
              v-else-if="sProps[item.prop]?.category === 'switch'"
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
            >
            </el-switch>
            <el-radio-group
              v-else-if="sProps[item.prop]?.category === 'radio'"
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
            >
              <el-radio
                style="padding: 5px 0"
                v-for="option in sProps[item.prop].options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
            <el-checkbox-group
              v-else-if="sProps[item.prop]?.category === 'checkbox'"
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
            >
              <el-checkbox
                v-for="option in sProps[item.prop].options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled || false"
              >
                {{ option.label }}
              </el-checkbox>
            </el-checkbox-group>
            <el-cascader
              v-else-if="sProps[item.prop]?.category === 'cascader'"
              v-model="scope.row[item.prop]"
              v-bind="sProps[item.prop]"
              v-on="sMethods[item.prop] || {}"
              style="width: 100%"
            ></el-cascader>
            <slot
              v-else-if="sProps[item.prop]?.category === 'custom'"
              :name="item.prop + '-edit'"
              :row="scope.row"
              :value="scope.row[item.prop]"
              :$index="scope.$index"
            ></slot>
          </div>

          <template v-else>
            <slot
              :name="item.prop"
              :row="scope.row"
              :value="scope.row[item.prop]"
              :$index="scope.$index"
            >
              <template v-if="item.formatter">
                {{
                  item.formatter(
                    scope.row,
                    awTableRef.store.states.columns.value[index],
                    scope.row[item.prop],
                    index
                  )
                }}
              </template>
              <template v-else>
                <span
                  v-if="
                    sProps[item.prop]?.category === 'select' ||
                    sProps[item.prop]?.category === 'cascader' ||
                    sProps[item.prop]?.category === 'radio'
                  "
                >
                  {{
                    echoData(scope.row[item.prop], sProps[item.prop].options) ||
                    ""
                  }}</span
                >
                <el-tag
                  v-for="(tag, index) in scope.row[item.prop]"
                  :key="index + tag"
                  v-else-if="sProps[item.prop]?.category === 'tag'"
                  class="m-x-2"
                  >{{ tag || "" }}
                </el-tag>
                <el-switch
                  v-else-if="sProps[item.prop]?.category === 'switch'"
                  v-model="scope.row[item.prop]"
                  disabled
                  v-bind="sProps[item.prop]"
                  v-on="sMethods[item.prop] || {}"
                ></el-switch>
                <template
                  v-else-if="sProps[item.prop]?.category === 'checkbox'"
                >
                  <template v-if="scope.row[item.prop].length">
                    <el-tag
                      class="m-x-2"
                      v-for="(item1, index) in echoData(
                        scope.row[item.prop],
                        sProps[item.prop].options
                      ).split('/')"
                      :key="index + item1"
                      >{{ item1 || "" }}</el-tag
                    >
                  </template>
                  <template v-else>
                    <span>{{ "" }}</span>
                  </template>
                </template>
                <slot v-else>
                  <span>{{ scope.row[item.prop] }} </span>
                </slot>
              </template>
            </slot>
          </template>
        </template>
      </el-table-column>

      <el-table-column
        v-if="isOperate"
        align="center"
        label="操作"
        :fixed="isActionFixed ? 'right' : false"
        :width="isActionFixed ? 125 : ''"
      >
        <template #default="scope">
          <el-button
            :loading="operateLoading"
            link
            v-show="scope.row[rowKey] == cellEdit[0] && cellEdit[2]"
            type="primary"
            @click="saveEdit(scope.row, scope.$index)"
          >
            确定
          </el-button>
          <el-button
            link
            v-show="mode === 'one' && scope.row[rowKey] !== cellEdit[0]"
            type="primary"
            @click="editRow(scope.row, scope.$index)"
            style="margin-left: 0"
          >
            编辑
          </el-button>
          <el-button
            link
            v-show="scope.row[rowKey] == cellEdit[0] && cellEdit[2]"
            type="info"
            @click="cancelEdit(scope.row, scope.$index)"
          >
            取消
          </el-button>
          <el-popconfirm
            title="确定要删除吗？"
            @confirm="removeRow(scope.row, scope.$index)"
          >
            <template #reference>
              <el-button
                :loading="operateLoading"
                link
                v-show="
                  (scope.row[rowKey] !== cellEdit[0] || !cellEdit[2]) &&
                  isShowDel
                "
                type="danger"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-if="!isAddHidden"
      type="success"
      plain
      :icon="Plus"
      class="button-add"
      size="small"
      @click="addRow"
    ></el-button>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@icon-park/vue-next";
import { PropType, nextTick, onMounted, reactive, ref, watchEffect } from "vue";
import { echoCascaderData } from "../utils";
import AwInputNumber from "../AwInputNumber/index.vue";
import { ElMessage } from "element-plus";
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
interface IColumn {
  prop: string;
  label: string;
  hidden?: boolean;
  [key: string | number | symbol]: any;
}
const allProps = defineProps({
  rowKey: {
    type: String,
    default: "id"
  },
  mode: {
    type: String,
    default: "one" // 默认"one"单条保存，"any"为多条保存
  },
  // 是否隐藏添加行
  isAddHidden: {
    type: Boolean,
    default: false
  },
  // 是否操作列固定
  isActionFixed: {
    type: Boolean,
    default: true
  },
  // 是否显示操作列
  isOperate: {
    type: Boolean,
    default: true
  },
  // 是否显示删除按钮
  isShowDel: {
    type: Boolean,
    default: true
  },
  changeRowData: {
    type: Function
  },
  addRowBefore: {
    type: Function
  },
  columns: {
    type: Array as PropType<IColumn[]>,
    required: true,
    default: () => []
  },

  data: {
    type: Array,
    default: () => []
  },

  props: {
    type: Object as PropType<IProps>,
    default: () => ({})
  },

  methods: {
    type: Object,
    default: () => ({})
  },
  tableProp: {
    type: Object,
    default: () => ({
      height: "auto",
      border: true,
      stripe: true,
      size: "small"
    })
  }
});

const awTableRef = ref();
const operateLoading = ref(false);
const sProps = reactive(allProps.props);
const sMethods = reactive(allProps.methods);
/**存放 id, 和当前列的name,  整行是否编辑, 点击行index值*/
const cellEdit = ref(["", "", false, 0]);

const sTableProps = reactive(
  Object.assign(
    { height: "auto", border: true, stripe: true, size: "small" },
    allProps.tableProp
  )
) as Record<string, any>;
const tableData = ref([]);

watchEffect(() => {
  tableData.value = JSON.parse(JSON.stringify(allProps.data));
});

const templateData = reactive({});
onMounted(() => {
  for (const key in sProps) {
    if (
      sProps[key].category === "checkbox" ||
      sProps[key].category === "cascader" ||
      sProps[key].category === "tag"
    ) {
      templateData[key] = [];
    } else if (sProps[key].category === "input-number") {
      templateData[key] = 0;
    } else {
      templateData[key] = "";
    }
  }
});

//tag部分的处理
const inputTagVisible = ref(false);
const inputTagValue = ref("");
const saveInputTagRef = ref(null);
function getTagMethods(tag: any, data: Array<any>, name: string) {
  const mergeMethods = Object.assign({}, sMethods?.[name]);
  mergeMethods.close = (tag: any) => {
    data.splice(data.indexOf(tag), 1);
    typeof sMethods?.[name]?.close === "function" &&
      sMethods?.[name]?.close(tag);
  };
  return mergeMethods;
}
function showInputTag() {
  inputTagVisible.value = true;
  nextTick(() => {
    // console.log(saveInputTagRef.value.$refs.input, "saveInputTagRef");
    saveInputTagRef.value.$refs.input.focus();
  });
}
function handleInputTagConfirm(data) {
  let inputValue = inputTagValue.value;
  if (inputValue) {
    data.push(inputValue);
  }
  inputTagVisible.value = false;
  inputTagValue.value = "";
}

let keyForMode = "";
function columnClik(row, column, cell, event) {
  // let index = tableData.value.findIndex(item => {
  //   return item[allProps.rowKey] === row[allProps.rowKey];
  // });
  keyForMode = row[allProps.rowKey];

  cellEdit.value[1] = column.property;
  // cellEdit.value[3] = index;
}
function echoData(ids, data, lab?, val?, list?) {
  if (["string", "number"].includes(typeof ids)) {
    return echoCascaderData(ids, data, lab, val, list);
  } else {
    const finish = [];
    ids?.forEach(id => {
      finish.push(echoCascaderData(id, data, lab, val, list));
    });
    return finish.join("/");
  }
}
//编辑框是否显示
function isEditShow(row, index, name) {
  if (cellEdit.value[2] && allProps.mode === "one") {
    return row[allProps.rowKey] === cellEdit.value[0] && cellEdit.value[2];
  } else if (allProps.mode === "any") {
    return row[allProps.rowKey] === keyForMode && name == cellEdit.value[1];
  }
}

let copeRow = null;
let isNewLabel = false;
//删除这行数据
function delRow(index) {
  //当这一行数据为空时删除掉
  if (allProps.mode == "one" && copeRow) {
    let isDel = undefined;
    isDel = allProps.columns
      .filter(column => !column.hidden)
      .find(item => {
        return copeRow[item.prop] != "" || copeRow[item.prop].length;
      });
    if (!isDel) {
      tableData.value.splice(index, 1);
    }
  }
}
function cancelEdit(row, index) {
  cellEdit.value[2] = false;
  cellEdit.value[0] = "";
  tableData.value[index] = JSON.parse(JSON.stringify(copeRow));
  delRow(index);
  isNewLabel = false;
}
function saveEdit(row, index) {
  operateLoading.value = true;
  if (isNewLabel && allProps.changeRowData) {
    const newRow = JSON.parse(JSON.stringify(row));
    newRow[allProps.rowKey] = ""; //这里因为后端要求在新建的时候id（props.rowKey）得为空，
    allProps
      .changeRowData({ row: newRow, index, type: "save" })
      .then(res => {
        if (res && typeof res === "object") {
          tableData.value[index] = JSON.parse(JSON.stringify(res));
        }
        if (res && typeof res === "string") {
          row[allProps.rowKey] = res;
        }
        cellEdit.value[2] = false;
        cellEdit.value[0] = "";
        isNewLabel = false;
        operateLoading.value = false;
      })
      .catch(reject => {
        ElMessage({
          type: "error",
          message: reject
        });
        operateLoading.value = false;
        return;
      });
  } else if (allProps.changeRowData) {
    allProps
      .changeRowData({ row, index, type: "edit" })
      .then(res => {
        cellEdit.value[2] = false;
        cellEdit.value[0] = "";
        operateLoading.value = false;
      })
      .catch(reject => {
        ElMessage({
          type: "error",
          message: reject
        });
        operateLoading.value = false;
        return;
      });
  } else {
    cellEdit.value[2] = false;
    cellEdit.value[0] = "";
    isNewLabel = false;
  }
}
function editRow(row, index) {
  if (isNewLabel) {
    return ElMessage({
      type: "error",
      message: "请先保存新增行的数据"
    });
  }
  inputTagVisible.value = false;
  cellEdit.value[2] = true;
  if (
    !isNewLabel &&
    cellEdit.value[0] &&
    cellEdit.value[0] !== row[allProps.rowKey]
  ) {
    tableData.value[String(cellEdit.value[3])] = JSON.parse(
      JSON.stringify(copeRow)
    );
  }
  copeRow = JSON.parse(JSON.stringify(tableData.value[index]));

  cellEdit.value[3] = index;
  cellEdit.value[0] = row[allProps.rowKey];
}
function removeRow(row, index) {
  if (allProps.mode === "one" && allProps.changeRowData) {
    allProps
      .changeRowData({ row, index, type: "delete" })
      .then(() => {
        tableData.value.splice(index, 1);
        const num = tableData.value.findIndex(
          item => item[allProps.rowKey] == cellEdit.value[0]
        );
        if (num !== -1) {
          cellEdit.value[3] = num;
        }
        isNewLabel = false;
        operateLoading.value = false;
      })
      .catch(reject => {
        ElMessage({
          type: "error",
          message: reject
        });
        operateLoading.value = false;
      });
  } else {
    tableData.value.splice(index, 1);
    const num = tableData.value.findIndex(
      item => item[allProps.rowKey] == cellEdit.value[0]
    );
    if (num !== -1) {
      cellEdit.value[3] = num;
    }
    isNewLabel = false;
  }
}
async function addRow() {
  if (cellEdit.value[2] === true) {
    return ElMessage({
      type: "error",
      message: "请先保存当前编辑行的数据"
    });
  }
  let outside = {};
  if (allProps.addRowBefore) {
    await allProps.addRowBefore().then(res => (outside = res));
  }
  const template = Object.assign(
    {},
    templateData,
    {
      [allProps.rowKey]: String(new Date().getTime())
    },
    outside
  );

  if (!tableData.value.length) {
    cellEdit.value[0] = template[allProps.rowKey];
  }
  if (!allProps.isAddHidden) {
    tableData.value.push(JSON.parse(JSON.stringify(template)));
  } else {
    tableData.value.unshift(JSON.parse(JSON.stringify(template)));
  }

  if (allProps.mode === "one") {
    copeRow = JSON.parse(JSON.stringify(template));
    cellEdit.value = [
      template[allProps.rowKey],
      "",
      true,
      tableData.value.length - 1
    ];
  }

  isNewLabel = true;
}
//获取整个table用于$refs
function getData() {
  const data = JSON.parse(JSON.stringify(tableData.value));
  return data;
}
function getCellEdit() {
  return [...cellEdit.value];
}
defineExpose({
  awTableRef,
  getData,
  addRow,
  getCellEdit
});
</script>
<script lang="ts">
export default {
  name: "AwEditTable"
};
</script>
<style lang="scss" scoped>
.button-add {
  width: 100%;
  border-style: dashed;
  margin-top: 10px;
  &:hover {
    // background: var(--el-color-success-light-8);
    // color: var(--el-color-success-light-3);
    font-weight: bold;
  }
}
</style>
