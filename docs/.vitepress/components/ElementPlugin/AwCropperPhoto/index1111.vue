<template>
  <div>
    <el-dialog title="图片剪裁" v-model="visible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align: center; height: 300px">
          <VueCropper ref="cropperRef" v-bind="option"></VueCropper>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="finish">确 认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import cropper from "vue-cropper";
import "vue-cropper/dist/index.css";
import { UploadStatus, UploadRawFile, ElMessage } from "element-plus";
import { computed, PropType, ref, watch } from "vue";
interface IUploadFile {
  name: string;
  percentage?: number;
  status: UploadStatus;
  size?: number;
  response?: unknown;
  uid: number;
  url?: string;
  raw?: UploadRawFile;
  [key: string]: unknown;
}
const { VueCropper } = cropper;
const emit = defineEmits(["getFileList", "update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
  },
  file: {
    type: Object as PropType<IUploadFile>,
    default: () => ({
      url: "",
    }),
    require: true,
  },
  options: {
    type: Object,
    default: () => {},
  },
});
const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const cropperRef = ref<InstanceType<typeof VueCropper>>();
const option = ref(
  Object.assign(
    {
      img: "", //裁剪图片的地址
      outputSize: 0.8, //裁剪生成图片的质量(可选0.1 - 1)
      outputType: "jpeg", //裁剪生成图片的格式（jpeg || png || webp）
      info: true, //图片大小信息
      canScale: true, //图片是否允许滚轮缩放
      autoCrop: true, //是否默认生成截图框
      autoCropWidth: 300, //默认生成截图框宽度
      autoCropHeight: 200, //默认生成截图框高度
      fixed: true, //是否开启截图框宽高固定比例
      fixedNumber: [7, 5], //截图框的宽高比例
      full: true, //false按原比例裁切图片，不失真
      fixedBox: false, //固定截图框大小，不允许改变
      canMove: true, //上传图片是否可以移动
      canMoveBox: true, //截图框能否拖动
      original: false, //上传图片按照原始比例渲染
      centerBox: false, //截图框是否被限制在图片里面
      height: true, //是否按照设备的dpr 输出等比例图片
      infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
      maxImgSize: "max", //限制图片最大宽度和高度
      enlarge: 1, //图片根据截图框输出比例倍数
      mode: "230px 150px", //图片默认渲染方式
    },
    props.options
  )
);
function finish() {
  cropperRef.value.getCropBlob(data => {
    const newFile = new File([data], props.file.name, {
      type: props.file.raw.type,
    });
    const cropperFile = Object.assign({}, props.file, {
      raw: newFile,
      url: URL.createObjectURL(data),
    });
    emit("getFileList", [cropperFile]);
    emit("update:modelValue", false);
    // console.log(cropperFile, "cropperFile");
    ElMessage({
      message: "裁剪成功！",
      type: "success",
    });
  });
}
function cancel() {
  emit("getFileList", []);
  emit("update:modelValue", false);
}
watch(
  () => props.file,
  val => {
    // console.log(val, "watchfile");
    option.value.img = val.url ? val.url : URL.createObjectURL(val.raw);
  },
  { deep: true }
);
</script>
<script lang="ts">
export default {
  name: "AwCropperPhoto",
};
</script>
<style lang="scss" scoped>
* {
  touch-action: none;
}
</style>
