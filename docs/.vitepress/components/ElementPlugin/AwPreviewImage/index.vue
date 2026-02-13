<template>
  <div v-if="modelValue">
    <el-image-viewer
      @close="close"
      teleported
      :url-list="urlLists"
      ref="imgViewerRef"
    />
    <div class="imgWatermark">
      <div
        class="mark"
        v-for="(item, index) in 100"
        :key="index"
        :style="watermark.styles"
      >
        {{ watermark.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  urlList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  watermark: {
    type: [Object],
    default: () => ({ text: "", styles: {} }),
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const imgViewerRef = ref();
function close() {
  emit("update:modelValue", false);
}
const urlLists = computed(() => {
  return props.urlList.length ? props.urlList : [props.url];
});
defineExpose({ imgViewerRef });
</script>
<script lang="ts">
export default {
  name: "AwPreviewImage",
};
</script>
<style lang="scss" scoped>
.imgWatermark {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 10000;
}
.imgWatermark .mark {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  transform: rotate(-30deg);
  color: var(--el-mask-color-extra-light);
  font-size: 16px;
}
</style>
