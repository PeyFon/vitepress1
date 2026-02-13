<template>
  <el-button @click="showImg">显示预览图片</el-button>
  <aw-preview-image
    v-model="imageVisible"
    :url="imageUrl"
    :urlList="urlList"
    :watermark="{ text: '水印' }"
  ></aw-preview-image>
</template>

<script setup lang="ts">
import { ref } from "vue";

//image
const imageVisible = ref(false);
const imageUrl = ref(
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
);
const urlList = ref([
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
]);
function showImg() {
  imageVisible.value = true;
}
</script>

<style lang="scss" scoped></style>
