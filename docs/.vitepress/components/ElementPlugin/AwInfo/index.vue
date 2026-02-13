<template>
  <div class="info">
    <div v-if="Boolean(title)" class="title">{{ title }}</div>
    <el-row v-bind="rowProp">
      <slot>
        <div class="empty">暂无数据</div>
      </slot>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { provide } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  data: {
    type: Object,
    required: true,
  },
  rowProp: {
    type: Object,
    default: () => ({ gutter: 20 }),
  },
  colProp: {
    type: Object,
    default: () => ({}),
  },
});
provide("props", props);
</script>
<script lang="ts">
export default {
  name: "AwInfo",
};
</script>
<style lang="scss" scoped>
.info {
  .title {
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
    color: var(--el-text-color-primary);
  }
  .empty {
    text-align: center;
    color: var(--el-text-color-secondary);
  }
}
</style>
