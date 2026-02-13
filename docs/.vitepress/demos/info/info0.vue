<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <!-- 详情分组1 -->
      <aw-info title="标题1" :data="info" :col-prop="{ span: 12 }">
        <aw-info-item prop="name" label="姓名" />
        <aw-info-item prop="sex" label="性别">
          <template #content="scope">
            {{ scope ? "男" : "女" }}
          </template>
        </aw-info-item>
        <aw-info-item
          prop="birthday"
          label="生日"
          :formatter="val => useDateFormat(val, 'YYYY-MM-DD HH:mm:ss').value"
        ></aw-info-item>
        <aw-info-item prop="resume" label="个人简介"></aw-info-item>
      </aw-info>
      <!-- 详情分组2 -->
      <aw-info title="标题2" :data="info">
        <aw-info-item prop="img" label="头像1" :col-prop="{ span: 12 }">
          <template #content="scope">
            <el-avatar :src="scope.value" :size="100"></el-avatar>
          </template>
        </aw-info-item>
        <aw-info-item prop="img2" :col-prop="{ span: 12 }">
          <template #content="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.value"
              :preview-src-list="[scope.value]"
            >
            </el-image>
          </template>
        </aw-info-item>
        <aw-info-item prop="images" label="照片墙">
          <template #content="scope">
            <el-image
              v-for="(photo, index) in scope.value"
              :key="index"
              style="width: 200px; height: 140px; margin-right: 10px"
              :src="scope.value[index]"
              :preview-src-list="scope.value"
            >
            </el-image>
          </template>
        </aw-info-item>
        <aw-info-item prop="files" label="简历附件" :col-prop="{ span: 12 }">
          <template #content="scope">
            <!-- <aw-file-list
              :datas="scope.value"
              :downLoad="$downloadFile"
              :preview="$previewFile"
              :watermark="{ text: '我是水印' }"
            ></aw-file-list> -->
          </template>
        </aw-info-item>
      </aw-info>
      <el-button @click="handle" type="primary"> 切换姓名</el-button>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { reactive } from "vue";
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
function handle() {
  info.name = "切换了" + Math.round(Math.random() * 100 + 1);
}
const info = reactive({
  name: "小明",
  sex: 0,
  birthday: "2021-03-03T16:00:00",
  resume: "很长很长很长很长很长很长很长很长很长很长的个人简介，超出显示省略号",
  img: "https://upload.jianshu.io/users/upload_avatars/19764802/d192f539-1942-4504-aadd-9d6bcd34ed33?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
  img2: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  images: [
    "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
    "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
    "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
    "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
    "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
    "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
    "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
  ],
  files: [
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
  ],
});
</script>

<style lang="scss" scoped></style>
