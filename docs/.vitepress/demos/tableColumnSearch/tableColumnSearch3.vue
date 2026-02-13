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
          ref="agerangeRef"
          prop="agerange"
          label="自定义"
          show-overflow-tooltip
          v-model="searchObj.agerange"
          :search-filter="{
            category: 'custom',
            attrs: {},
          }"
        >
          <template #header="scope">
            $index：{{ scope.$index }}
            <el-button @click="handleClose">关闭</el-button>
          </template>
        </aw-table-column-search>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
const agerangeRef = ref();
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
  agerange: null,
});

function handleClose() {
  agerangeRef.value.closePopover();
}
watch(searchObj, () => {
  console.log(searchObj);
});
</script>

<style lang="scss" scoped></style>
