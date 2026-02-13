<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        highlight-current-row
        tooltip-effect="light"
      >
        <el-table-column prop="id" label="tagId" show-overflow-tooltip>
        </el-table-column>
        <aw-table-column-search
          sortable
          prop="name"
          label="tag名"
          show-overflow-tooltip
          v-model="searchObj.searchName"
          :search-filter="{
            category: 'input',
            attrs: {
              placeholder: '请输入',
            },
          }"
        >
          <template #default="scope">
            <div>{{ scope }}</div>
          </template>
        </aw-table-column-search>
        <aw-table-column-search
          prop="range"
          label="range"
          show-overflow-tooltip
          v-model="searchObj.range"
          :formatter="(row:  typeof tableData[0]) => row.range.join('~')"
          :search-filter="{
            category: 'date-picker',
            attrs: {
              type: 'monthrange',
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              placeholder: '请输入',
            },
          }"
        >
          <template #default="scope">
            <div>{{ scope.$index }}</div>
          </template>
        </aw-table-column-search>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";

const tableData = ref([
  {
    id: "1-1-1-1",
    name: "小明",
    sex: 0,
    hobby: [0, 1],
    married: 1,
    state: 0,
    address: "0-1",
    birthday: "2000-01-01",
    range: ["2006-09", "2008-06"],
    agerange: [18, 19],
    credit: 70,
  },
  {
    id: "2-2-2-2",
    name: "小红",
    sex: 1,
    hobby: [2],
    state: 1,
    married: 0,
    address: "1-2",
    birthday: "2000-01-01",
    range: ["2006-09", "2008-06"],
    agerange: [30, 40],
    credit: 100,
  },
]);

const searchObj = reactive({
  searchName: null,
  range: null,
});

watch(searchObj, () => {
  console.log(searchObj);
});
</script>

<style lang="scss" scoped></style>
