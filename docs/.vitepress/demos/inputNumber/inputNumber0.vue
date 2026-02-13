<template>
  <div>
    <aw-input-number
      v-model="bindNum"
      :min="1"
      :max="2000"
      @change="changeNum"
    ></aw-input-number>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const bindNum = ref();
function changeNum(val) {
  console.log("val: ", val);
  console.log("bindNum：", bindNum.value);
}
</script>
