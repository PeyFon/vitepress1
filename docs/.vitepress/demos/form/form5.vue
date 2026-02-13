<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-form
        v-model="formProps.model"
        :props="formProps.props"
        :rules="formProps.rules"
        :methods="formProps.methods"
        :colProp="{
          span: 8,
        }"
        :rowProp="{ gutter: 20 }"
        ref="formRef"
      >
        <template #input1-divide>
          <div style="width: 100%; margin-bottom: 18px">
            <span style="font-weight: bold">自定义分隔</span>
          </div>
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
    input3: null,
    input4: null,
    input5: null,
  },
  props: {
    input1: {
      category: "input",
      label: "名称1",
      placeholder: "请输入名称",
      span: 16,
      slotNames: ["divide"],
    },
    input2: {
      category: "input",
      label: "名称2",
      placeholder: "请输入名称",
    },
    input3: {
      category: "input",
      label: "名称3",
      placeholder: "请输入名称",
    },
    input4: {
      category: "input",
      label: "名称4",
      placeholder: "请输入名称",
    },
    input5: {
      category: "input",
      label: "名称5",
      placeholder: "请输入名称",
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
  methods: {},
});
function submitForm() {
  formRef.value.validateForm().then((form: typeof formProps.model) => {
    console.log(form);
  });
}
function cancel() {
  formRef.value.resetForm();
}
</script>

<style lang="scss" scoped></style>
