<template>
  <el-button @click="showVideo">显示预览video</el-button>
  <aw-preview-video v-model="videoVisible" :url="videoUrl"></aw-preview-video>
</template>

<script setup lang="ts">
import { ref } from "vue";

//video
const videoVisible = ref(false);
const videoUrl = ref("https://vjs.zencdn.net/v/oceans.mp4");
function showVideo() {
  videoVisible.value = true;
}
</script>

<style lang="scss" scoped></style>
