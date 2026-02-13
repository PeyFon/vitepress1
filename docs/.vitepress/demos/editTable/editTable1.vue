<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-edit-table
        ref="editTableRef"
        style="margin-bottom: 20px"
        :columns="columns"
        :props="formProps.props"
        :methods="formProps.methods"
        :data="tableData"
        :changeRowData="changeRowData"
        :addRowBefore="addRowBefore"
      >
      </aw-edit-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
const editTableRef = ref(null);
const columns = ref([
  {
    prop: "settingId",
    label: "settingId",
    hidden: true,
  },
  {
    prop: "settingName",
    label: "标题名称",
  },
  {
    prop: "settingValue",
    label: "值",
  },
]);
const formProps = reactive({
  props: {
    settingId: {
      category: "input",
    },
    settingName: {
      category: "input",
    },
    settingValue: {
      category: "select",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
    },
    text: {
      category: "input",
      label: "文本",
    },
  },
  methods: {
    settingName: {
      change: value => {
        console.log(value, "value");
      },
    },
  },
});
const tableData = ref([]);
function changeRowData(events) {
  console.log("events", events);
  if (events.type == "save") {
    return new Promise((resolve, reject) => {
      if (events.row.settingName && events.row.settingValue) {
        resolve(null);
        //resolve内可以传入 后端返回的数据例如：1、id值 2、后端接口返回的整行数据 row 。  这样可以不用请求整个table
      } else {
        reject("标题名称和值不能为空！");
      }
    });
  }
  //编辑
  if (events.type == "edit") {
    return new Promise((resolve, reject) => {
      if (events.row.settingName && events.row.settingValue) {
        resolve(null);
      } else {
        reject("标题名称和值不能为空！");
      }
    });
  }
  if (events.type == "delete") {
    return new Promise(resolve => {
      resolve(null);
    });
  }
}
function addRowBefore() {
  return new Promise((resolve, reject) => {
    resolve({
      settingId: "11",
      settingName: "22",
      settingValue: "选项2",
      text: "33",
    });
  });
}
</script>

<style lang="scss" scoped></style>
