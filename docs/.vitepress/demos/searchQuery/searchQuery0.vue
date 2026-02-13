<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-search-query
        v-model="formPropsSearch.model"
        :props="formPropsSearch.props"
        :methods="formPropsSearch.methods"
        :form-prop="formPropsSearch.formProp"
        @getSearchData="getSearchData"
        @resetSearch="resetSearch"
        :inputWidth="200"
        ref="searchRef"
      >
        <template #Name-append>
          <el-button>按钮</el-button>
        </template>
      </aw-search-query>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
const formPropsSearch = reactive({
  model: {
    Stage: "",
    Name: "",
    EnterpriseName: "",
    EnterpriseIndustry: "",
  },
  props: {
    Stage: {
      category: "select",
      label: "招商阶段",
      placeholder: "请选择",
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
    },
    Name: {
      category: "input",
      label: "项目名称",
      placeholder: "请输入",
      slotNames: ["append"],
    },
    EnterpriseIndustry: {
      category: "input",
      label: "行业",
      placeholder: "请输入",
    },
    EnterpriseName: {
      category: "input",
      label: "企业名称",
      placeholder: "请输入",
    },
  },
  methods: {},
  formProp: {
    "label-width": "100px",
  },
});
function getSearchData(obj) {
  console.log(obj, "search");
}
function resetSearch(obj) {
  console.log(obj, "reset");
}
</script>

<style lang="scss" scoped></style>
