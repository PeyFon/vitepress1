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
        <template #input1>
          这是自定义form拓展
          <el-select
            v-model="formProps.model.input1"
            placeholder="请选择"
            style="width: 100px"
          >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
          </el-select>
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
  },
  props: {
    input1: {
      category: "custom",
      label: "组件拓展",
    },
  },
  rules: {},
  methods: {},
});
</script>

<style lang="scss" scoped></style>
