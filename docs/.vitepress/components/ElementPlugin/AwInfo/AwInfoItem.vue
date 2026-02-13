<template>
  <el-col v-bind="colProps" class="info-item">
    <div class="label">{{ label ? label + "：" : "" }}</div>
    <div class="value">
      <slot name="content" :value="data[prop]">
        <span
          v-if="formatter"
          class="default-value"
          :title="formatter(data[prop])"
        >
          {{ formatter(data[prop]) }}
        </span>
        <span v-else class="default-value" :title="data[prop]">
          {{ data[prop] }}
        </span>
      </slot>
    </div>
  </el-col>
</template>
<script lang="ts" setup>
import { inject } from "vue";

const props = defineProps({
  colProp: {
    type: Object,
    default: () => ({}),
  },
  prop: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  // slot插槽#content优先级>formatter
  formatter: {
    type: Function,
    default: null,
  },
});
const propP = inject("props") as {
  data: object;
  colProp: object;
  rowProp: object;
  [key: string]: unknown;
};

let data = propP.data;

const colProps = Object.assign({}, propP.colProp, props.colProp);
</script>
<script lang="ts">
export default {
  name: "AwInfoItem",
};
</script>
<style lang="scss" scoped>
.info-item {
  margin-bottom: 16px;
  display: flex;
  .label {
    // width: 80px;
    flex-shrink: 0;
    // text-align: justify;
    // text-align-last: justify;
  }
  .value {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .default-value {
    white-space: nowrap;
  }
}
</style>
