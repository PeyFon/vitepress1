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
          prop="sex"
          label="性别"
          show-overflow-tooltip
          v-model="searchObj.sex"
          :search-filter="{
            category: 'radio',
            attrs: {
              placeholder: '请选择...',
              multiple: true,
              options: [
                { label: '男', value: 0 },
                { label: '女', value: 1 },
              ],
            },
            methods: sexMethod,
          }"
        >
        </aw-table-column-search>

        <aw-table-column-search
          prop="address"
          label="地址"
          show-overflow-tooltip
          v-model="searchObj.address"
          :search-filter="{
            category: 'cascader',
            attrs: {
              showAllLevels: false,
              options: [
                {
                  label: '青岛',
                  value: 0,
                  children: [
                    {
                      value: '0-1',
                      label: '李沧',
                    },
                    {
                      value: '0-2',
                      label: '崂山',
                    },
                  ],
                },
                {
                  label: '济南',
                  value: 1,
                  children: [
                    {
                      value: '1-1',
                      label: '长青',
                    },
                    {
                      value: '1-2',
                      label: '章丘',
                    },
                  ],
                },
              ],
            },
          }"
        >
        </aw-table-column-search>
        <aw-table-column-search
          prop="birthday"
          label="birthday"
          show-overflow-tooltip
          v-model="searchObj.birthday"
          :search-filter="{
            category: 'date-picker',
            attrs: {
              type: 'date',
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              placeholder: '请输入',
            },
          }"
        >
        </aw-table-column-search>
        <aw-table-column-search
          prop="timePicker"
          label="time-picker"
          show-overflow-tooltip
          v-model="searchObj.timePicker"
          :search-filter="{
            category: 'time-picker',
            attrs: {
              placeholder: '请输入',
            },
          }"
        >
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
        </aw-table-column-search>
        <aw-table-column-search
          prop="agerange"
          label="自定义"
          show-overflow-tooltip
          v-model="searchObj.agerange"
          :search-filter="{
            category: 'custom',
            attrs: {},
          }"
        >
          <template #header="scope"> {{ scope.$index }} </template>
        </aw-table-column-search>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
// const { proxy } = getCurrentInstance()
// const router = useRouter()

import { ref, watch, reactive } from "vue";

// const route = useRoute()
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
  sex: null,
  hobby: null,
  address: null,
  birthday: null,
  timePicker: null,
  range: null,
  agerange: null,
});

const sexMethod = {
  change: (val: number) => {
    getTableData(val);
  },
};
watch(searchObj, () => {
  console.log(searchObj, 222);
});
function getTableData(val) {
  console.log("log", val);
}
</script>

<style lang="scss" scoped></style>
