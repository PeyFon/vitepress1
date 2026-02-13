<template>
  <section class="codeBox">
    <div class="container">
      <component :is="component"></component>
    </div>
    <div class="operation">
      <button data-tip="在playground中编辑" @click="openPlayGround">
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          width="1.2em"
          height="1.2em"
          data-v-5d9e4641=""
        >
          <path
            fill="currentColor"
            d="M16 2v2h-1v3.243c0 1.158.251 2.301.736 3.352l4.282 9.276A1.5 1.5 0 0 1 18.656 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.282-9.276A7.994 7.994 0 0 0 9 7.243V4H8V2h8zm-2.612 8.001h-2.776c-.104.363-.23.721-.374 1.071l-.158.361L6.125 20h11.749l-3.954-8.567a9.978 9.978 0 0 1-.532-1.432zM11 7.243c0 .253-.01.506-.029.758h2.058a8.777 8.777 0 0 1-.021-.364L13 7.243V4h-2v3.243z"
          ></path>
        </svg>
      </button>
      <button :data-tip="tip" :class="{ open: open }" @click="open = !open">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          class="arco-icon arco-icon-code"
          stroke-width="4"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          data-v-1bd552f0=""
        >
          <path
            d="M16.734 12.686 5.42 24l11.314 11.314m14.521-22.628L42.57 24 31.255 35.314M27.2 6.28l-6.251 35.453"
          ></path>
        </svg>
      </button>
      <button :data-tip="copyTip" @click="copy">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          class="arco-icon arco-icon-copy"
          stroke-width="4"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          data-v-1bd552f0=""
        >
          <path
            d="M20 6h18a2 2 0 0 1 2 2v22M8 16v24c0 1.105.891 2 1.996 2h20.007A1.99 1.99 0 0 0 32 40.008V15.997A1.997 1.997 0 0 0 30 14H10a2 2 0 0 0-2 2Z"
          ></path>
        </svg>
      </button>
    </div>
    <collapse-transition>
      <div
        v-show="open"
        :class="{ sourceCode: true, open: open }"
        v-html="source"
      ></div>
    </collapse-transition>
  </section>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from "vue";
const modules = import.meta.glob("../demos/**/*.vue");
const props = defineProps({
  source: {
    type: String,
    require: true,
  },
  rawSource: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
});

function openPlayGround() {
  console.log(123);
  window.open(
    "https://element-plus.run/#eyJBcHAudnVlIjoiPHRlbXBsYXRlPlxuICA8ZWwtcm93IGNsYXNzPVwibWItNFwiPlxuICAgIDxlbC1idXR0b24+RGVmYXVsdDwvZWwtYnV0dG9uPlxuICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIj5QcmltYXJ5PC9lbC1idXR0b24+XG4gICAgPGVsLWJ1dHRvbiB0eXBlPVwic3VjY2Vzc1wiPlN1Y2Nlc3M8L2VsLWJ1dHRvbj5cbiAgICA8ZWwtYnV0dG9uIHR5cGU9XCJpbmZvXCI+SW5mbzwvZWwtYnV0dG9uPlxuICAgIDxlbC1idXR0b24gdHlwZT1cIndhcm5pbmdcIj5XYXJuaW5nPC9lbC1idXR0b24+XG4gICAgPGVsLWJ1dHRvbiB0eXBlPVwiZGFuZ2VyXCI+RGFuZ2VyPC9lbC1idXR0b24+XG4gIDwvZWwtcm93PlxuXG4gIDxlbC1yb3cgY2xhc3M9XCJtYi00XCI+XG4gICAgPGVsLWJ1dHRvbiBwbGFpbj5QbGFpbjwvZWwtYnV0dG9uPlxuICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiBwbGFpbj5QcmltYXJ5PC9lbC1idXR0b24+XG4gICAgPGVsLWJ1dHRvbiB0eXBlPVwic3VjY2Vzc1wiIHBsYWluPlN1Y2Nlc3M8L2VsLWJ1dHRvbj5cbiAgICA8ZWwtYnV0dG9uIHR5cGU9XCJpbmZvXCIgcGxhaW4+SW5mbzwvZWwtYnV0dG9uPlxuICAgIDxlbC1idXR0b24gdHlwZT1cIndhcm5pbmdcIiBwbGFpbj5XYXJuaW5nPC9lbC1idXR0b24+XG4gICAgPGVsLWJ1dHRvbiB0eXBlPVwiZGFuZ2VyXCIgcGxhaW4+RGFuZ2VyPC9lbC1idXR0b24+XG4gIDwvZWwtcm93PlxuXG4gIDxlbC1yb3cgY2xhc3M9XCJtYi00XCI+XG4gICAgPGVsLWJ1dHRvbiByb3VuZD5Sb3VuZDwvZWwtYnV0dG9uPlxuICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiByb3VuZD5QcmltYXJ5PC9lbC1idXR0b24+XG4gICAgPGVsLWJ1dHRvbiB0eXBlPVwic3VjY2Vzc1wiIHJvdW5kPlN1Y2Nlc3M8L2VsLWJ1dHRvbj5cbiAgICA8ZWwtYnV0dG9uIHR5cGU9XCJpbmZvXCIgcm91bmQ+SW5mbzwvZWwtYnV0dG9uPlxuICAgIDxlbC1idXR0b24gdHlwZT1cIndhcm5pbmdcIiByb3VuZD5XYXJuaW5nPC9lbC1idXR0b24+XG4gICAgPGVsLWJ1dHRvbiB0eXBlPVwiZGFuZ2VyXCIgcm91bmQ+RGFuZ2VyPC9lbC1idXR0b24+XG4gIDwvZWwtcm93PlxuXG4gIDxlbC1yb3c+XG4gICAgPGVsLWJ1dHRvbiA6aWNvbj1cIlNlYXJjaFwiIGNpcmNsZSAvPlxuICAgIDxlbC1idXR0b24gdHlwZT1cInByaW1hcnlcIiA6aWNvbj1cIkVkaXRcIiBjaXJjbGUgLz5cbiAgICA8ZWwtYnV0dG9uIHR5cGU9XCJzdWNjZXNzXCIgOmljb249XCJDaGVja1wiIGNpcmNsZSAvPlxuICAgIDxlbC1idXR0b24gdHlwZT1cImluZm9cIiA6aWNvbj1cIk1lc3NhZ2VcIiBjaXJjbGUgLz5cbiAgICA8ZWwtYnV0dG9uIHR5cGU9XCJ3YXJuaW5nXCIgOmljb249XCJTdGFyXCIgY2lyY2xlIC8+XG4gICAgPGVsLWJ1dHRvbiB0eXBlPVwiZGFuZ2VyXCIgOmljb249XCJEZWxldGVcIiBjaXJjbGUgLz5cbiAgPC9lbC1yb3c+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IGxhbmc9XCJ0c1wiIHNldHVwPlxuaW1wb3J0IHtcbiAgQ2hlY2ssXG4gIERlbGV0ZSxcbiAgRWRpdCxcbiAgTWVzc2FnZSxcbiAgU2VhcmNoLFxuICBTdGFyLFxufSBmcm9tICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZSdcbjwvc2NyaXB0PlxuIiwiaW1wb3J0X21hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge31cbn0iLCJfbyI6e319",
    "_blank"
  );
}

const open = ref(false);
const tip = computed(() => `${open.value ? "收起" : "展开"}代码`);

const copyTip = ref("复制代码");
function decode(str) {
  return decodeURIComponent(str);
}
const source = decode(props.source);
// console.log(modules, `../demos/${props.path}`, modules[`../demos/${props.path}.vue`]);
const component = props.path
  ? defineAsyncComponent(modules[`../demos/${props.path}`])
  : null;
const copy = () => {
  navigator.clipboard.writeText(decode(props.rawSource));
  copyTip.value = "复制成功";
  let timer = null;
  setTimeout(() => {
    copyTip.value = "复制代码";
    clearTimeout(timer);
  }, 2000);
};
</script>

<script>
import collapseTransition from "./CollapseTransition.vue";
export default {
  components: {
    collapseTransition,
  },
};
</script>

<style scoped>
.codeBox {
  --container-border-color: 60, 60, 67, 0.12;
  --btn-background-color: 255, 255, 255;
  --btn-open-background-color: 29, 33, 41;
  --btn-border-color: 229, 230, 235;
  --btn-open-border-color: 247, 248, 250;
  --btn-color: 78, 89, 107;
  --btn-open-color: 247, 248, 250;
  --source-code-background-color: 242, 243, 245;
}

html.dark .codeBox {
  --container-border-color: 51, 51, 53;
  --btn-background-color: 49, 49, 50;
  --btn-open-background-color: 246, 246, 246;
  --btn-border-color: 255, 255, 255, 0.12;
  --btn-open-border-color: 23, 23, 26;
  --btn-color: 255, 255, 255, 0.7;
  --btn-open-color: 23, 23, 26;
  --source-code-background-color: 46, 46, 48;
}

.container {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid rgba(var(--container-border-color));
  border-radius: 5px 5px 0 0;
}

.operation {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}

.operation button {
  position: relative;
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 50%;
  margin-left: 10px;
  background-color: rgb(var(--btn-background-color));
  border: 1px solid rgb(var(--btn-border-color));
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(var(--btn-color));
}

.operation button.open {
  color: rgb(var(--btn-open-color));
  background-color: rgb(var(--btn-open-background-color));
  border-color: rgb(var(--btn-open-border-color));
}

.operation button::before {
  content: attr(data-tip);
  display: none;
  position: absolute;
  top: -185%;
  left: -110%;
  color: rgb(235, 234, 235);
  width: max-content;
  height: 36px;
  background-color: rgb(29, 33, 41);
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 100;
}

.operation button::after {
  content: "";
  display: none;
  position: absolute;
  top: -55%;
  left: 15%;
  width: 0;
  height: 0;
  border-width: 6px 8px 6px 8px;
  border-style: solid;
  border-color: rgb(29, 33, 41) transparent transparent transparent;
}

.operation button:hover {
  border-color: rgb(22, 93, 255);
  color: rgb(22, 93, 255);
}

.operation button:hover::before,
.operation button:hover::after {
  display: flex;
}

.operation svg {
  width: 14px;
  height: 14px;
  color: inherit;
}

.sourceCode {
  box-sizing: border-box;
  margin: 0;
  padding: 28px 48px;
  background-color: rgb(var(--source-code-background-color));
  border-radius: 4px;
  overflow: hidden;
  max-height: 600px;
}

.sourceCode.open {
  overflow: scroll;
}

.code-enter-from {
  max-height: 0;
  transform-origin: 50% 50%;
}

.code-enter-active {
  transition: all 2s ease-out;
}

.code-enter-to {
  max-height: 1000px;
}
</style>
