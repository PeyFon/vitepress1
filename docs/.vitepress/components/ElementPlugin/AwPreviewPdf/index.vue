<template>
  <div class="modal" :class="modelValue ? 'show' : 'hide'">
    <div class="toolbar">
      <button
        title="Close (Esc)"
        class="close"
        @click="$emit('update:modelValue', false)"
      ></button>
    </div>
    <div
      v-if="modelValue"
      style="width: 100%; height: 100%; position: relative"
    >
      <iframe :src="url" width="100%" height="100%" frameborder="0" />
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
  </div>
</template>
<script>
export default {
  name: "AwPreviewPdf",
  props: {
    url: {
      type: String,
      default: "",
    },
    watermark: {
      type: [Object],
      default: () => ({ text: "", styles: {} }),
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.3);
  transition: transform 0.6s;
}
.modal.show {
  transform: scale(1);
}
.modal.hide {
  transform: scale(0);
}
.imgWatermark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 74px;
  left: 0;
  overflow: hidden;
  pointer-events: none;
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
.toolbar {
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 60px;
  text-align: right;
}
.close {
  cursor: pointer;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAABYCAQAAACjBqE3AAAB6klEQVR4Ae3bsWpUQRTG8YkkanwCa7GzVotsI/gEgk9h4Vu4ySLYmMYgbJrc3lrwZbJwC0FMt4j7F6Y4oIZrsXtgxvx/1c0ufEX4cnbmLCmSJEmSJEmSJEmSJP3XCBPvbJU+8doWmDFwyZpLBmYlNJebz0KwzykwsuSYJSNwykEJreV2BaBMaLIQZ2xYcFgqDlmw4ayE/FwL0dDk4Qh4W37DAjgqIT+3HRbigjH+iikVdxgZStgyN0Su2sXIeTwTT+esdpcbIlfNAuZ/TxresG4zV8kYWSZNiKUTokMMSWeIwTNEn4fK2TW3gRNgVkJLuVksROA9G+bEvoATNlBCa7nZXEwdxEZxzpKRKFh+bsv8LmPFmhX1OwfIz81jIRJQ5eeqG9B+riRJkiRJkiRJkiRJkiRJkiRJUkvA/8RQoEpKlJWINFkJ62AlrEP/mNBibnv2yz/A3t7Uq3LcpoxP8COjC1T5vxoAD5VdoEqdDrd5QuW1swtUSaueh3zkiuBiqgtA2OlkeMcP/uDqugsJdbjHF65VdPMKwS0+WQc/MgKvrIOHysB9vgPwk8+85hmPbnQdvHZyDMAFD7L3EOpgMcVdvnHFS0/vlatrXvCVx0U9gt3fxvnA0/hB4nmRJEmSJEmSJEmSJGmHfgFLaDPoMu5xWwAAAABJRU5ErkJggg==)
    0 0 no-repeat;
  background-size: 264px 88px;
  width: 60px;
  height: 60px;
  background-position: 10px -34px;
  border: 0;
}
</style>
