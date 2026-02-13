<template>
  <el-button @click="showPdf">显示预览PDF</el-button>
  <aw-preview-pdf v-model="pdfVisible" :url="pdfUrl"></aw-preview-pdf>
</template>

<script setup lang="ts">
import { ref } from "vue";

//pdf
const pdfVisible = ref(false);
const pdfUrl = ref(
  "https://book.sciencereading.cn/shop/book/Booksimple/onlineRead.do?id=B6239E7721BCA413DB3A13E07A3922AC5000&readMark=0"
);
function showPdf() {
  pdfVisible.value = true;
}
</script>

<style lang="scss" scoped></style>
