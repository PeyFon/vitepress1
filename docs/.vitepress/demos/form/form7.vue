<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-form
        v-model="formProps.model"
        :props="formProps.props"
        :form-item="formProps.formItem"
        ref="formRef"
      >
        <template #input1-form-item-label="{ label }">
          <span style="align-items: center; display: inline-flex">
            <el-tooltip effect="dark" content="提示一些信息" placement="top">
              <el-icon>
                <Info></Info>
              </el-icon>
            </el-tooltip>
            {{ label }}
          </span>
        </template>
      </aw-form>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { Info } from "@icon-park/vue-next";
import { AwFormInstance } from "@/components/ElementPlugin/types/instance";
import { ref, reactive } from "vue";
const formRef = ref<AwFormInstance>();
const formProps = reactive({
  model: {
    input1: null,
  },
  props: {
    input1: {
      category: "input",
      label: "名称",
      placeholder: "请输入名称",
    },
  },
  formItem: {
    slotNames: ["label"],
  },
});
</script>

<style lang="scss" scoped></style>
