<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-form
        v-model="formProps.model"
        :props="formProps.props"
        :rules="formProps.rules"
        :methods="formProps.methods"
      >
        <template #select-option="{ option }">
          <span style="float: left">{{ option.label }}</span>
          <span
            style="
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            "
            >{{ option.value }}</span
          >
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
    select: null,
  },
  props: {
    select: {
      category: "select",
      label: "select",
      multiple: true,
      slotNames: ["option"],
      options: [
        {
          value: "Beijing1",
          label: "Beijing",
        },
        {
          value: "Shanghai1",
          label: "Shanghai",
        },
        {
          value: "Nanjing1",
          label: "Nanjing",
        },
        {
          value: "Chengdu1",
          label: "Chengdu",
        },
        {
          value: "Shenzhen1",
          label: "Shenzhen",
        },
        {
          value: "Guangzhou1",
          label: "Guangzhou",
        },
      ],
    },
  },
  rules: {},
  methods: {},
});
</script>

<style lang="scss" scoped></style>
