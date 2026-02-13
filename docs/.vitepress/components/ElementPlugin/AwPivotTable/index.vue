<template>
  <div>
    <el-table
      v-if="!isTransposed"
      ref="tableRef"
      :data="props.data"
      border
      v-bind="$attrs"
    >
      <slot></slot>
    </el-table>

    <el-table
      v-else
      ref="transposedTableRef"
      :data="transposedData"
      border
      v-bind="$attrs"
      @header-dragend="handleHeaderDragend"
    >
      <!-- 特殊类型列(index/selection/expand) -->
      <el-table-column
        v-for="(col, colIndex) in specialTypeColumns"
        :key="`type-${colIndex}`"
        v-bind="col.columnProps"
      />

      <!-- 属性列 -->
      <el-table-column
        prop="property"
        :label="propertyColumnTitle"
        v-bind="propertyColumnProps"
      >
        <template #header="scope">
          <component
            v-if="getHeaderRendererForProperty()"
            :is="getHeaderRendererForProperty()"
            :column="scope.column"
            :$index="scope.$index"
          />
          <template v-else>{{ propertyColumnTitle }}</template>
        </template>
        <template #default="scope">
          <component
            v-if="getDefaultRendererForProperty(scope.row.property)"
            :is="getDefaultRendererForProperty(scope.row.property)"
            :row="scope.row"
            :$index="scope.$index"
          />
          <template v-else>{{ scope.row.property }}</template>
        </template>
      </el-table-column>

      <!-- 根据原始数据生成的数据列 -->
      <el-table-column
        v-for="(item, index) in props.data"
        :key="'data-' + index"
        :prop="'data' + index"
        :label="getItemTitle(item)"
        v-bind="dataColumnProps"
      >
        <template #header="scope">
          <component
            v-if="getHeaderRendererForData()"
            :is="getHeaderRendererForData()"
            :column="scope.column"
            :row="item"
            :$index="index"
          />
          <template v-else>{{ getItemTitle(item) }}</template>
        </template>

        <template #default="scope">
          <template v-for="(col, colIdx) in dataColumns" :key="`col-${colIdx}`">
            <template v-if="scope.row.property === col.label">
              <component
                v-if="getDefaultRendererForData(scope.row.property)"
                :is="getDefaultRendererForData(scope.row.property)"
                :row="item"
                :column="{ property: col.prop, label: col.label }"
                :$index="index"
                :value="item[col.prop]"
              />
              <span v-else>
                {{
                  col.formatter
                    ? formatCellValue(col.formatter, item[col.prop], item, col)
                    : item[col.prop]
                }}
              </span>
            </template>
          </template>
        </template>
      </el-table-column>

      <!-- 保留的非转置列（没有prop属性的普通列） -->
      <el-table-column
        v-for="(col, colIndex) in nonTransposedColumns"
        :key="`non-transposed-${colIndex}-${col?.id}`"
        v-bind="col.columnProps"
      >
        <template #header="scope">
          <component
            v-if="getHeaderRendererForCommon(col)"
            :is="getHeaderRendererForCommon(col)"
            :column="scope.column"
            :$index="scope.$index"
          />
          <template v-else>{{ col.label }}</template>
        </template>
        <template #default="scope">
          <component
            v-if="getDefaultRendererForCommon(col)"
            :is="getDefaultRendererForCommon(col)"
            :row="getOriginalFormattedRow(scope.row)"
            :column="col"
            :$index="scope.$index"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useTemplateRef,
  useSlots,
  watch
} from "vue";

defineOptions({
  name: "AwPivotTable"
});

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  isTransposed: {
    type: Boolean,
    default: false
  },
  propertyColumnLabel: {
    type: String,
    default: ""
  },
  propertyColumnWidth: {
    type: [Number, String]
  },
  columnAttrs: {
    type: Object,
    default: () => ({})
  },
  titleColumnIndex: {
    type: Number,
    default: 0
  }
});

// 属性列的属性
const propertyColumnProps = computed(() => {
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
});

// 数据列的属性
const dataColumnProps = computed(() => {
  return Object.assign(
    {
      align: "center",
      headerAlign: "center",
      minWidth: "100",
      showOverflowTooltip: true
    },
    props.columnAttrs
  );
});

// 渲染器存储
const columnSlotRenderers = ref({}); // 列单元格渲染器
const propertySlotMap = ref({}); // 属性名到单元格渲染器的映射
const headerSlotRenderers = ref({}); // 表头渲染器
const propertyHeaderSlotMap = ref({}); // 属性名到表头渲染器的映射

// 表格引用
const tableRef = useTemplateRef("tableRef");
const transposedTableRef = useTemplateRef("transposedTableRef");
const columnsInfo = ref([]);
const originalColumnsInfo = ref([]); // 缓存原始列信息
const slots = useSlots();

/**
 * 渲染器获取函数
 */
// 根据属性名获取对应的数据单元格渲染器
function getDefaultRendererForData(propertyName) {
  if (!propertyName) return null;

  // 先尝试通过属性名直接查找
  if (propertySlotMap.value[propertyName]) {
    return propertySlotMap.value[propertyName];
  }

  // 再尝试通过prop或label查找
  return (
    columnSlotRenderers.value[`prop:${propertyName}`] ||
    columnSlotRenderers.value[`label:${propertyName}`]
  );
}

// 获取数据列表头渲染器
function getHeaderRendererForData() {
  if (!titleColumn.value) return null;

  // 先尝试通过属性名直接查找
  if (propertySlotMap.value[titleColumn.value?.prop]) {
    return propertySlotMap.value[titleColumn.value?.prop];
  }

  // 再尝试通过prop或label查找
  return (
    columnSlotRenderers.value[`prop:${titleColumn.value?.prop}`] ||
    columnSlotRenderers.value[`label:${titleColumn.value?.label}`]
  );
}

// 根据列获取对应的插槽渲染器
function getDefaultRendererForCommon(column) {
  if (!column) return null;

  // 尝试多种方式找到对应的渲染器
  if (column.prop && columnSlotRenderers.value[`prop:${column.prop}`]) {
    return columnSlotRenderers.value[`prop:${column.prop}`];
  }

  if (column.label && columnSlotRenderers.value[`label:${column.label}`]) {
    return columnSlotRenderers.value[`label:${column.label}`];
  }

  if (columnSlotRenderers.value[column.index]) {
    return columnSlotRenderers.value[column.index];
  }

  return null;
}

// 获取普通列表头渲染器
function getHeaderRendererForCommon(column) {
  if (!column) return null;

  if (column.label && headerSlotRenderers.value[`label:${column.label}`]) {
    return headerSlotRenderers.value[`label:${column.label}`];
  }

  return null;
}

// 获取属性列表头渲染器
function getHeaderRendererForProperty() {
  if (!titleColumn.value) return null;

  // 先尝试通过属性名直接查找
  if (propertyHeaderSlotMap.value[titleColumn.value?.prop]) {
    return propertyHeaderSlotMap.value[titleColumn.value?.prop];
  }

  // 再尝试通过prop或label查找
  return (
    headerSlotRenderers.value[`prop:${titleColumn.value?.prop}`] ||
    headerSlotRenderers.value[`label:${titleColumn.value?.label}`]
  );
}

// 根据属性名获取对应的属性列插槽渲染器
function getDefaultRendererForProperty(propertyName) {
  if (!propertyName) return null;

  // 先尝试通过属性名直接查找
  if (propertyHeaderSlotMap.value[propertyName]) {
    return propertyHeaderSlotMap.value[propertyName];
  }

  // 再尝试通过prop或label查找
  return (
    headerSlotRenderers.value[`prop:${propertyName}`] ||
    headerSlotRenderers.value[`label:${propertyName}`]
  );
}

/**
 * 工具函数
 */
// 获取格式化后的单元格值
function formatCellValue(formatter, cellValue, row, column) {
  return typeof formatter === "function"
    ? formatter(row, column, cellValue, null)
    : cellValue;
}

// 处理表头拖动事件，重新计算布局
function handleHeaderDragend() {
  nextTick(() => transposedTableRef.value?.doLayout());
}

// 为非转置列提供格式化的行数据
function getOriginalFormattedRow(transposedRow) {
  // 构造接近原始数据格式的行对象
  const result = {
    _property: transposedRow.property
  };

  // 添加每列的值
  props.data.forEach((item, index) => {
    const key = `data${index}`;
    if (transposedRow[key] !== undefined) {
      result[key] = transposedRow[key];

      // 同时提供原始属性名的访问
      dataColumns.value.forEach(col => {
        if (col.label === transposedRow.property && col.prop) {
          result[col.prop] = transposedRow[key];
        }
      });
    }
  });

  return result;
}

/**
 * 列插槽处理
 */
// 将单列映射到渲染器
function mapColumnSlot(columnVNode, slotIndex, columns) {
  // 提取列组件的属性
  const props = columnVNode.props || {};
  const { type, prop, label } = props;

  // 检查是否有default插槽内容
  const hasDefaultSlot =
    columnVNode.children && typeof columnVNode.children.default === "function";

  // 检查是否有header插槽内容
  const hasHeaderSlot =
    columnVNode.children && typeof columnVNode.children.header === "function";

  // 处理default插槽
  if (hasDefaultSlot) {
    // 创建渲染函数
    const renderFn = props => {
      return columnVNode.children.default({
        row: props.row,
        column: props.column,
        $index: props.$index,
        value: props.value
      });
    };

    // 多种方式存储渲染器
    columnSlotRenderers.value[slotIndex] = renderFn;

    if (prop) {
      columnSlotRenderers.value[`prop:${prop}`] = renderFn;
      propertySlotMap.value[prop] = renderFn;
    }

    if (label) {
      columnSlotRenderers.value[`label:${label}`] = renderFn;
      propertySlotMap.value[label] = renderFn;
    }
  }

  // 处理header插槽
  if (hasHeaderSlot) {
    // 创建header渲染函数
    const headerRenderFn = props => {
      return columnVNode.children.header({
        column: props.column,
        $index: props.$index
      });
    };

    // 多种方式存储header渲染器
    headerSlotRenderers.value[slotIndex] = headerRenderFn;

    if (prop) {
      headerSlotRenderers.value[`prop:${prop}`] = headerRenderFn;
      propertyHeaderSlotMap.value[prop] = headerRenderFn;
    }

    if (label) {
      headerSlotRenderers.value[`label:${label}`] = headerRenderFn;
      propertyHeaderSlotMap.value[label] = headerRenderFn;
    }
  }

  // 找到对应的表格列，建立映射
  const matchedColumn = columns.find(
    col =>
      (prop && col.property === prop) ||
      (label && col.label === label) ||
      (type && col.type === type)
  );

  if (matchedColumn) {
    const columnIndex = columns.indexOf(matchedColumn);

    if (hasDefaultSlot) {
      columnSlotRenderers.value[columnIndex] =
        columnSlotRenderers.value[slotIndex];
    }

    if (hasHeaderSlot) {
      headerSlotRenderers.value[columnIndex] =
        headerSlotRenderers.value[slotIndex];
    }
  }
}

// 分析默认插槽中的列组件并提取渲染器
function analyzeColumnSlots() {
  // 首先获取所有默认插槽内容(列组件)
  const defaultSlots = slots.default?.();
  if (!defaultSlots || !defaultSlots.length) return;

  // 提取原始表格列信息
  const columns = tableRef.value?.columns || [];
  if (columns.length === 0) return;

  // 清空现有映射
  columnSlotRenderers.value = {};
  propertySlotMap.value = {};
  headerSlotRenderers.value = {};
  propertyHeaderSlotMap.value = {};

  // 遍历所有列组件
  defaultSlots.forEach((columnVNode, slotIndex) => {
    mapColumnSlot(columnVNode, slotIndex, columns);
  });
}

// 提取并存储列信息
async function extractAndStoreColumns(force = false) {
  if (!tableRef.value) return;

  await nextTick();

  // 只在需要时分析列插槽
  if (force || !Object.keys(columnSlotRenderers.value).length) {
    analyzeColumnSlots();
  }

  const columns = tableRef.value.columns || [];
  console.log("columns: ", columns);

  // 只有在非转置模式下且列信息有变化或强制更新时才更新原始列信息
  if (
    !props.isTransposed &&
    (force || columns.length !== originalColumnsInfo.value.length)
  ) {
    originalColumnsInfo.value = columns.map((col, index) => {
      // 创建列属性对象 - 直接合并所有属性
      const columnProps = {};

      // 复制所有非函数和非特殊属性
      Object.entries(col).forEach(([key, value]) => {
        if (
          value !== undefined &&
          typeof value !== "function" &&
          ![
            "children",
            "parent",
            "columnOrTableParent",
            "isSubColumn",
            "realWidth"
          ].includes(key)
        ) {
          columnProps[key] = value;
          if (["headerAlign", "align"].includes(key) && value) {
            columnProps[key] = value.split("-")[1];
          }
        }
      });

      // 将 property 映射为 prop (如果存在)
      if (col.property && !columnProps.prop) {
        columnProps.prop = col.property;
      }

      // 创建基础列信息对象
      return {
        index,
        prop: col.property,
        label: col.label,
        type: col.type,
        isSpecial: ["index", "selection", "expand"].includes(col.type),
        hasNoProp: !col.property,
        formatter: col.formatter,
        // 存储处理后的列属性，用于v-bind
        columnProps,
        // 检查是否有对应的插槽
        hasSlot: !!getDefaultRendererForCommon({
          index,
          prop: col.property,
          label: col.label,
          type: col.type
        })
      };
    });
  }

  // 总是保持columnsInfo为最新的列信息
  columnsInfo.value = props.isTransposed ? originalColumnsInfo.value : columns;
}

/**
 * 生命周期钩子和监听器
 */
// 监听表格实例创建
watch(
  () => tableRef.value,
  val => val && extractAndStoreColumns(true)
);

// 监听数据变化
watch(
  () => props.data.length,
  () => extractAndStoreColumns()
);

// 监听转置状态变化
watch(
  () => props.isTransposed,
  newVal => {
    if (newVal) {
      // 转置时使用缓存的列信息
      columnsInfo.value = originalColumnsInfo.value;
    } else {
      // 非转置时等待表格重新渲染后提取列信息
      nextTick(() => extractAndStoreColumns());
    }
  },
  { immediate: true }
);

// 组件挂载后提取列信息
onMounted(() => {
  nextTick(() => extractAndStoreColumns(true));
});

/**
 * 计算属性
 */
// 标题列（用于生成列标题的列）
const titleColumn = computed(() => {
  if (!originalColumnsInfo.value.length) return null;

  // 根据索引获取列
  const index = props.titleColumnIndex;
  if (index > 0 && index < originalColumnsInfo.value.length) {
    return originalColumnsInfo.value[index];
  }

  // 默认返回第一个非特殊列
  return (
    originalColumnsInfo.value.find(col => !col.isSpecial && !col.hasNoProp) ||
    originalColumnsInfo.value[0]
  );
});

// 属性列的标题：优先使用用户提供的值，否则使用标题列的标签，最后使用默认值
const propertyColumnTitle = computed(() => {
  return props.propertyColumnLabel || titleColumn.value?.label || "属性";
});

// 需要转置的数据列（有prop属性的列）
const dataColumns = computed(() => {
  if (!originalColumnsInfo.value.length) return [];

  return originalColumnsInfo.value.filter(col => {
    // 排除特殊列、没有prop的列和标题列
    if (!col.prop || col.isSpecial) return false;
    if (col.index === titleColumn.value?.index) return false;
    return true;
  });
});

// 特殊类型列（有type属性的特殊列，如index/selection/expand）
const specialTypeColumns = computed(() => {
  if (!originalColumnsInfo.value.length) return [];
  return originalColumnsInfo.value.filter(col =>
    ["index", "selection", "expand"].includes(col.type)
  );
});

// 不需要转置的列（没有prop属性的普通列，不包括特殊类型列）
const nonTransposedColumns = computed(() => {
  if (!originalColumnsInfo.value.length) return [];
  return originalColumnsInfo.value.filter(
    col => !col.prop && !["index", "selection", "expand"].includes(col.type)
  );
});

// 获取每一行的标题（从原始数据中）
function getItemTitle(item) {
  if (!titleColumn.value || !titleColumn.value.prop) return "";
  return item[titleColumn.value.prop] || "";
}

// 转置数据
const transposedData = computed(() => {
  if (!props.data.length || !dataColumns.value.length) {
    return [];
  }

  // 每个属性列生成一行数据
  return dataColumns.value.map(col => {
    // 创建行对象，属性名为列标签
    const row = { property: col.label };

    // 从原始数据中提取对应属性的值
    props.data.forEach((item, index) => {
      row["data" + index] = col.prop ? item[col.prop] : "";
    });

    return row;
  });
});

// 只导出必要的公共API
defineExpose({
  getTransposedData: () => transposedData.value,
  getColumnsInfo: () => columnsInfo.value,
  transposedTableRef,
  tableRef,
  doLayout: () => {
    if (props.isTransposed) {
      transposedTableRef.value?.doLayout();
    } else {
      tableRef.value?.doLayout();
    }
  }
});
</script>
