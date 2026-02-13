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
        <template #input4-divide>
          <el-col :span="16"></el-col>
        </template>
      </aw-form>
      <el-button type="primary" @click="submitForm">确定</el-button>
      <el-button @click="cancel">重置</el-button>
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
    input2: null,
  },
  props: {
    input1: {
      category: "input",
      label: "名称1",
      placeholder: "有值显示名称2",
    },
    input2: {
      category: "input",
      label: "名称2",
      placeholder: "请输入名称",
      hidden: true,
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
  },
  methods: {
    input1: {
      change: val => {
        console.log(val);
        if (val) {
          formProps.props.input2.hidden = false;
        } else {
          formProps.props.input2.hidden = true;
        }
      },
    },
  },
});
function submitForm() {
  formRef.value.validateForm().then((form: typeof formProps.model) => {
    console.log(form);
  });
}
function cancel() {
  formRef.value.resetForm();
  formProps.props.input2.hidden = true;
}
</script>

<style lang="scss" scoped></style>
