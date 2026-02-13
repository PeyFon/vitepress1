<template>
  <aw-file-list
    :datas="files"
    :downLoad="downloadFile"
    :preview="previewFile"
    :watermark="{ text: '我是水印' }"
  ></aw-file-list>
</template>
<script setup lang="ts">
function downloadFile() {}
function previewFile() {}
const files = [
  {
    id: "12d21a86-5d85-ec08-35dc-39fc5d15fc8a",
    name: "关于印发《市政工程设计概算编制办法》的通知.pdf",
    size: "200000",
    listFlags: ["附件标签1"],
  },
  {
    id: "a6110cc6-5fb4-28da-cbb9-39fc5d4f190d",
    name: "光明路业务逻辑图.jpg",
    size: "200000",
  },
];
</script>
<style lang="scss" scoped></style>
