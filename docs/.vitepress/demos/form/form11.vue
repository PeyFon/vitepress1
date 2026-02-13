<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-form
        v-model="formProps.model"
        :props="formProps.props"
        :rules="formProps.rules"
        :methods="formProps.methods"
        ref="formRef"
      >
        <template #file-default>
          <el-button>自定义default，没有trigger插槽才会生效</el-button>
        </template>
        <!-- <template #file-file="{ file }">
          <el-button>自定义file{{ file }}</el-button>
        </template> -->
        <!-- <template #file-trigger>
          <el-button>自定义trigger</el-button>
        </template> -->
        <template #file-tip>
          <div>这里使用了tip插槽，可以放置一些之前业务的tag</div>
        </template>
      </aw-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { AwFormInstance } from "@/components/ElementPlugin/types/instance";
import { ref, reactive } from "vue";
const formRef = ref<AwFormInstance>();
const formProps = reactive({
  model: {
    file: null,
  },
  props: {
    file: {
      category: "upload",
      label: "file",
      // listType: "picture",
      "auto-upload": false,
      action: "https://jsonplaceholder.typicode.com/posts/",
      "file-list": [],
      headers: { Authorization: localStorage.getItem("token") },
      "on-success": (response, file, fileList) => {
        console.log(response, file, fileList, "上传成功");
      },
      "on-progress": (event, file, fileList) => {
        console.log(event, file, fileList);
      },
      slotNames: ["tip", "default", "trigger", "file"],
    },
  },
  rules: {},
  methods: {},
});
</script>

<style lang="scss" scoped></style>
