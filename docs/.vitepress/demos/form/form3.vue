<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-form
        v-model="formProps.model"
        :props="formProps.props"
        :rules="formProps.rules"
        :methods="formProps.methods"
        :colProp="{
          span: 12,
        }"
        :rowProp="{ gutter: 20 }"
        ref="formRef"
      >
        <template #footer="scope">
          <el-button type="primary" @click="submitForm(scope.form)"
            >确定</el-button
          >
          <el-button @click="cancel">重置</el-button>
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
    input1: null,
    rate1: null,
    select1: null,
  },
  props: {
    input1: {
      category: "input",
      label: "名称",
      placeholder: "请输入名称",
    },
    rate1: {
      category: "rate",
      label: "评级",
    },
    select1: {
      category: "select",
      label: "选择",
      multiple: true,
      placeholder: "请选择",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
          disabled: true,
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
      ],
    },
  },
  rules: {
    input1: [
      {
        required: true,
        message: "角色名称不能为空",
        trigger: "blur",
      },
    ],
    rate1: [
      {
        required: true,
        trigger: ["change", "blur"],
        type: "float",
        validator: (rule, value, callback) => {
          if (value !== 0) {
            callback();
          } else {
            callback(new Error("没评级"));
          }
        },
      },
    ],
  },
  methods: {
    rate1: {
      change: () => {
        formRef.value.awFormRef.validateField("rate1");
      },
    },
  },
});
function submitForm(form) {
  console.log(form);
}
function cancel() {
  formRef.value.resetForm();
}
</script>

<style lang="scss" scoped></style>
