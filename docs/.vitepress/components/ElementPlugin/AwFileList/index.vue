<template>
  <div>
    <div v-if="datas?.length">
      <div v-for="(file, index) in datas" :key="index" class="files-item">
        <img
          width="14"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADjUlEQVRIS8XWTYgcRRQH8P+r3vWwiYg5GDRBjTkIUUQlQRMyM1VdowurHnLYlSgKGpCgoiAYIYJRPCh+oOjBgxAPih/ZRMU9Gae7inHdBDGIh8QgJAoxLAhBMMi6A11PaqmR3rZ7dmb2kD41Va/eb+rrTRMu0UOXyMWqYGPM/QBqRFRj5uuIqA3gW+fc0TiOf+o1qaFga+12Zn4ewD0Vyf9h5ifiOD5YhQ8MJ0nyohDCoyMALgI4CmCemS8S0dUANgJoepCIfpFS3liGDwQH9EBIlDjn9mutvy8mNsa8C+DJ0P6dUmpnMaZvuIBOK6Wmeu2hMeZBAB/5GGZ+Lo7j1/LxfcGDol3AWvsVM98H4IRSautAcBU6MzMzNjY2to+IthHRfJZlnzWbzW/yyY0xewG8B+BvpdTavuEqNEmSu4UQrwK4LZ+suKTGmFsB/Ohjsizb3Gw2z3bjK5e6CrXW7mLmz3Pg20S0OSwpRkZG1tVqtT99/9zc3LrFxcULIXabUuqHnnAVaoy5l4iOMPNl4bpMSSmnjTHXA/g1HKStcRyf8O/W2t3M/LF/X1hYuGJiYuKvSrgKTdN03KMA1uRR/54fI4S4ttFonPPtaZoeJKJHiOhnKeWWyj1O07RBRDYE/HdlkiSJoyg6zMxX9kIBfKqU2h1mO8nMh0L8O1LKp3seLmutHzDZvafGmJ3MfISIrloBPRlF0VS9Xj/Vbre3ZFnm0ZsAnO50Oo3x8fE/+j7VaZreQUSHQxn0JXBpT4vLC6AK9aEPKaWWCklfcJIktwshPLppyJn6H/qClPLlIrqUr6zRGHMzAI8uFfhhZkpE+6WUr5TlL4WNMWuJ6Gtm3rEKdJ+U8vUqtAr2Jc6XuqFmyszPxHH8Vi/0f3Ch0jyrlHqjmyB3VysPknPuKa21/0tc8Vm2x+EanAyjNimlfstn8Pjo6OihkisD59zjWmu/Wn09y+BwfY77kVEUXVOv1+fLshTuqUcf01q/35cYgpbBSZJsEEL8Hvp2KaW+LCYrQR/VWn8wCFp6uKy1bWauATiXZdme/H9sq9W6K4oif3B8RfIzfVhr/eGgaCncarVuiKLoTC7ZtHPulBDCF/nJbrtz7gGt9SfDoKWwb2y327dkWea/HteXJD4dPvK+GBathH3H7Ozs5Z1O5yUhxJ3MvJ2IjjnnjjPzm1rr86tBe8KrTbzS+L6+MldKMkz/vw7b8y6+mideAAAAAElFTkSuQmCC"
        />
        <span
          v-if="
            isImage(file.name) ||
            isVideo(file.name) ||
            isDocType(file.name) ||
            isPdf(file.name)
          "
          class="file-name"
          :title="file.name"
        >
          <!-- 图片 -->
          <a
            href="javascript:void(0)"
            v-if="isImage(file.name)"
            @click="previewImage(file)"
            >{{ file.name }}</a
          >
          <!-- 视频 -->
          <a
            href="javascript:void(0)"
            v-if="isVideo(file.name)"
            @click="previewVideo(file)"
            >{{ file.name }}</a
          >
          <!-- pdf -->
          <a
            href="javascript:void(0)"
            v-if="isPdf(file.name)"
            @click="previewPDF(file)"
            >{{ file.name }}</a
          >
          <!-- 其他 -->
          <a
            href="javascript:void(0)"
            v-if="isDocType(file.name) && file.viewUrl"
            @click="previewDoc(file.viewUrl)"
            >{{ file.name }}</a
          >
          <span v-if="isDocType(file.name) && !file.viewUrl">{{
            file.name
          }}</span>
        </span>
        <span v-else class="file-name">
          <span>{{ file.name }}</span>
        </span>
        <span v-if="file.size" class="text-gray">
          ({{ formatSize(file.size) }})
        </span>
        <Download
          v-if="canDownload"
          class="color-primary"
          style="display: inline-block; vertical-align: sub"
          @click="downloadFile(file)"
        ></Download>
        <div v-if="file.listFlags" style="display: inline">
          <el-tag
            v-for="(tag, index) in file.listFlags"
            :key="index"
            type="success"
            size="small"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </div>
    <div v-else class="files-item" v-html="empty"></div>
    <!-- 图片、视频、pdf预览弹层 -->
    <aw-preview-image
      v-model="imageVisible"
      :url="imageUrl"
      :url-list="imageList"
      :watermark="watermark"
    ></aw-preview-image>
    <aw-preview-video
      v-model="videoVisible"
      :url="videoUrl"
      :watermark="watermark"
    ></aw-preview-video>
    <aw-preview-pdf
      v-model="pdfVisible"
      :url="pdfUrl"
      :watermark="watermark"
    ></aw-preview-pdf>
  </div>
</template>
<script lang="ts" setup>
import { formatSize } from "../utils/index";
import { isImage, isVideo, isDocType, isPdf } from "../utils/validate";
import AwPreviewImage from "../AwPreviewImage/index.vue";
import AwPreviewVideo from "../AwPreviewVideo/index.vue";
import AwPreviewPdf from "../AwPreviewPdf/index.vue";
import { PropType, ref } from "vue";
import { Download } from "@icon-park/vue-next";
interface IFile {
  name: string;
  id: string;
  url?: string;
  size: number;
  listFlags?: any[];
  [key: string]: unknown;
}
const props = defineProps({
  /* {id,name,url,size,listFlags}*/
  datas: {
    type: Array as PropType<IFile[]>,
    default: () => [],
  },
  canDownload: {
    type: Boolean,
    default: true,
  },
  watermark: {
    type: [Object],
    default: () => ({ text: "", styles: {} }),
  },
  downLoad: {
    type: Function,
  },
  preview: {
    type: Function,
  },
  empty: {
    default: () => "无",
  },
});
const imageVisible = ref(false);
const imageUrl = ref("");
const imageList = ref<string[]>([]);
const videoVisible = ref(false);
const videoUrl = ref("");
const pdfUrl = ref("");
const pdfVisible = ref(false);
function previewImage(file) {
  props.preview &&
    props.preview(file.id).then(url => {
      imageUrl.value = url;
      imageList.value = [url];
      imageVisible.value = true;
    });
}
function previewVideo(file) {
  props.preview &&
    props.preview(file.id).then(url => {
      videoUrl.value = url;
      videoVisible.value = true;
    });
}
function previewPDF(file) {
  props.preview &&
    props.preview(file.id).then(url => {
      pdfUrl.value = url;
      pdfVisible.value = true;
    });
}
function previewDoc(file) {
  // 尚未实现上传文档转换pdf并返回pdf地址功能，暂按真实url地址处理
  if (file.viewUrl) {
    pdfUrl.value = file.viewUrl;
    pdfVisible.value = true;
  }
}
function downloadFile(file) {
  props.downLoad &&
    props.downLoad(file.id).then(url => {
      const a = document.createElement("a");
      a.download = file.name;
      a.href = url;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}
</script>
<script lang="ts">
export default {
  name: "AwFileList",
};
</script>
<style lang="scss" scoped>
.files-item {
  margin-bottom: 3px;
  width: 100%;
  position: relative;
  > * {
    vertical-align: middle;
  }
  .file-name {
    display: inline-block;
    max-width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .text-gray {
    color: #ccc;
  }
  .color-primary {
    color: #48a2ff;
    cursor: pointer;
    padding: 0 3px;
  }
}
a {
  color: #48a2ff;
}
</style>
