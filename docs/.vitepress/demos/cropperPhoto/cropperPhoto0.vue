<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      awCropperPhoto裁剪图片
      <aw-form
        v-model="formProps.model"
        :props="formProps.props"
        :rules="formProps.rules"
        :methods="formProps.methods"
        ref="formRef"
      >
        <template #photos-default>
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </template>
      </aw-form>
      <aw-cropper-photo
        ref="photo"
        v-model="cropperVisible"
        :file="fileOption"
        :options="options"
        @getFileList="finish"
      ></aw-cropper-photo>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ElMessage, UploadFile, UploadFiles } from "element-plus";
import { Plus } from "@icon-park/vue-next";
import { useBase64 } from "@vueuse/core";
import { reactive, ref } from "vue";
// const { proxy } = getCurrentInstance();
// const router = useRouter()
// const route = useRoute()

const fileOption = ref();
const cropperVisible = ref(false);
const options = reactive({
  autoCropWidth: 150,
  autoCropHeight: 150,
  fixedNumber: [1, 1],
});

function finish(val) {
  console.log(val, "结果");
  val.length &&
    useBase64(val[0].raw).promise.value.then(res => {
      imageUrl.value = res;
      formProps.model.photos = res;
    });
}

let imageUrl = ref();
const formProps = reactive({
  model: {
    photos: "",
  },
  props: {
    photos: {
      category: "upload",
      label: "头像",
      "auto-upload": false,
      "show-file-list": false,
      accept: "image/*",
      action: "https://jsonplaceholder.typicode.com/posts/",
      headers: { Authorization: localStorage.getItem("token") },
      slotNames: ["default"],
      "on-success": (
        response: any,
        uploadFile: UploadFile,
        uploadFiles: UploadFiles
      ) => {
        console.log(response, uploadFile, uploadFiles, "上传成功");
        // formProps.model["file"] = proxy.$utils.getFormatFileList(
        //   fileList,
        //   formProps.model["file"]
        // );
      },
      "on-change": (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
        if (uploadFile.status === "ready") {
          if (uploadFile.raw.type.includes("image/")) {
            fileOption.value = uploadFile;
            cropperVisible.value = true;
          } else {
            ElMessage({
              message: "请选择图片！",
              type: "error",
            });
            formProps.model.photos = "";
          }
        }
      },
      // "on-progress": (event, file, fileList) => {}
    },
  },
  rules: {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
