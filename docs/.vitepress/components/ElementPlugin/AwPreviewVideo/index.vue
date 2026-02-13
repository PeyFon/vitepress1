<template>
  <div class="modal" :class="modelValue ? 'show' : 'hide'">
    <div class="toolbar">
      <button
        title="Close (Esc)"
        class="close"
        @click="handleClose"
        @keyup.esc="handleClose"
      ></button>
    </div>
    <div
      v-show="modelValue"
      style="width: 100%; height: 100%; position: relative"
    >
      <VideoPlayer
        v-if="url"
        ref="videoPlayer"
        class="video-player vjs-custom-skin"
        @mounted="handleMounted"
        :options="playerOptions"
        @ready="handleEvent($event)"
        @play="handleEvent($event)"
        @pause="handleEvent($event)"
        @ended="handleEvent($event)"
        @loadeddata="handleEvent($event)"
        @waiting="handleEvent($event)"
        @playing="handleEvent($event)"
        @canplay="handleEvent($event)"
        @canplaythrough="handleEvent($event)"
      >
      </VideoPlayer>
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
<script setup lang="ts">
import video from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { reactive, ref, shallowRef } from "vue";
const { VideoPlayer } = video;
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  poster: {
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
});
const emit = defineEmits(["update:modelValue"]);
const playerRef = shallowRef();
function handleMounted(payload) {
  playerRef.value = payload.player;
}
function handleEvent(params) {
  // console.log("Basic player event", params);
}
const playerOptions = reactive({
  currentTime: 0,
  // crossorigin: "anonymous",
  playsinline: true, //设置或取消设置playsinline属性。Playsinline告诉浏览器非全屏播放是首选。
  controls: true, // 属性设置或返回浏览器应当显示标准的视频控件
  volume: 0.6, //音量
  playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
  autoplay: false, // 如果为true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: false, // 是否视频一结束就重新开始。
  preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: "zh-CN",
  // aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  sources: [
    {
      type: "video/mp4", // 类型
      src: props.url, // url地址
    },
  ],
  poster: props.poster, // 封面地址
  notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controlBar: {
    timeDivider: true, // 当前时间和持续时间的分隔符
    durationDisplay: true, // 显示持续时间
    remainingTimeDisplay: true, // 是否显示剩余时间功能
    fullscreenToggle: true, // 是否显示全屏按钮
  },
});
const videoPlayer = ref(null);
function handleClose() {
  emit("update:modelValue", false);
  playerRef.value.pause();
}
defineExpose({
  videoPlayer,
  playerRef,
  handleMounted,
  handleEvent,
  handleClose,
});
</script>
<script lang="ts">
export default {
  name: "AwPreviewVideo",
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
.modal img {
  max-width: 100%;
  max-height: 100%;
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
  position: fixed;
  right: 20px;
  z-index: 999999999;
}
:deep(.vjs-custom-skin) {
  width: 100%;
  height: calc(100% - 60px);

  .vjs-big-play-button {
    width: 46px;
    height: 46px;
    border-radius: 23px;
    border-width: 2px;
    left: 50%;
    top: 50%;
    transform: translateX(-10px) translateY(-10px);
  }
}
</style>
