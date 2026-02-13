<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <el-button @click="isTransposed = !isTransposed" type="primary">
        {{ isTransposed ? "恢复原始视图" : "行列转换" }}
      </el-button>
      <span style="margin-left: 20px">转换姓名列</span>
      <aw-pivot-table
        ref="pivotTableRef"
        :data="tableData"
        :isTransposed="isTransposed"
        style="width: 100%"
        border
        :titleColumnIndex="4"
      >
        <el-table-column type="index" label="序号" align="right" fixed />
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          ref="nameColumn1"
          width="100"
          show-overflow-tooltip
        />

        <el-table-column prop="name" label="姓名" width="100" ref="nameColumn">
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click.stop="console.log('scope:', scope)"
            >
              编辑
            </el-button>
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
</script>

<style lang="scss" scoped></style>
