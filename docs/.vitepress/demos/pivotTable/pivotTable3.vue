<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <el-button
        @click="isTransposed = !isTransposed"
        type="primary"
        size="small"
      >
        {{ isTransposed ? "恢复原始视图" : "行列转换" }}
      </el-button>

      <aw-pivot-table
        ref="pivotTableRef"
        :data="tableData"
        :isTransposed="isTransposed"
        style="width: 100%"
        border
        @cell-click="handleCellClick"
        :cell-style="cellStyle"
      >
        <el-table-column type="index" label="序号" fixed />

        <el-table-column prop="date" label="日期">
          <template #default="scope">
            <span>
              {{ scope.row.date + scope.row.address }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话">
          <template #header="scope">
            <div>自定义{{ scope.$index }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          ref="nameColumn1"
          width="100"
          show-overflow-tooltip
        />

        <el-table-column prop="name" label="姓名" width="100" ref="nameColumn">
          <template #default="scope">
            <div>
              {{ scope?.row.name + "DIY" + scope.$index }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #header="scope">
            <div>操作{{ scope.$index }}</div>
          </template>
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click.stop="console.log('scope:', scope)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </aw-pivot-table>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, useTemplateRef } from "vue";

const isTransposed = ref(false);
const tableData = ref([
  {
    date: "2016-05-03",
    name: "王小虎",
    phone: "12345678901",
    address: "No. 189, Grove , Los "
  },
  {
    date: "2016-05-02",
    name: "张三",
    phone: "12345678902",
    address: "No. 190, St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "李四",
    phone: "12345678903",
    address: "No. 191, Grove St, Los Angeles"
  },
  {
    date: "2016-05-05",
    name: "王五",
    phone: "12345678904",
    address: "No. 192, Grove St, Los Angeles"
  }
]);
const pivotTableRef = useTemplateRef("pivotTableRef");

const handleCellClick = (row, column, cellValue) => {
  console.log("row:", row);
  console.log("column:", column);
  console.log("cellValue:", cellValue);
  console.log("pivotTableRef.value: ", pivotTableRef.value);
};
const cellStyle = data => {
  if (data.row.name === "王小虎" && data.column.label === "姓名") {
    return {
      backgroundColor: "red"
    };
  }
  if (data.row.property === "姓名" && data.column.property === "data0") {
    return {
      backgroundColor: "red"
    };
  }
};
</script>

<style lang="scss" scoped></style>
