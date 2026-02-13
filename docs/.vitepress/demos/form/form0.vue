<template>
  <el-container style="height: 100%">
    <el-main class="panel">
      <aw-form
        v-model="formProps.model"
        :props="formProps.props"
        :rules="formProps.rules"
        :methods="formProps.methods"
        :form-prop="formProps.formProp"
        :form-item="formProps.formItem"
        ref="formRef"
        :colProp="{
          span: 24,
        }"
        :rowProp="{ gutter: 20 }"
      >
        <template #autocomplete-form-item-label="{ label }">
          <span>{{ label }}form-item-label插槽</span>
        </template>
        <template #autocomplete-default="{ item }">
          <div class="value">{{ item.value }}</div>
          <span class="link">{{ item.link }}</span>
        </template>
        <template #autocomplete-suffix>
          <el-icon>
            <component :is="Alarm"></component>
          </el-icon>
        </template>
        <template #text1-prepend>
          <el-select
            v-model="select1"
            placeholder="请选择"
            style="width: 100px"
          >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
        </template>
        <template #text1-append>
          <el-button :icon="Alarm"></el-button>
        </template>
        <template #select-default>
          <!-- <el-option
            v-for="option in formProps.props.select.options"
            :key="option.label"
            :label="option.label"
            :value="option.label"
          >
          </el-option> -->
          <el-option-group
            v-for="group in formProps.props.select.options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </template>
        <template #daterange-default="cell">
          <div class="cell" :class="{ current: cell.isCurrent }">
            <span class="text">{{ cell.text }}</span>
            <span v-if="isHoliday(cell)" class="holiday" />
          </div>
        </template>
        <template #sortCustom>
          这是自定义form拓展
          <el-select
            v-model="formProps.model.sortCustom"
            placeholder="请选择"
            style="width: 100px"
          >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
        </template>
        <template #sortCustom2>
          这是自定义form拓展2
          <el-select
            v-model="formProps.model.sortCustom2"
            placeholder="请选择2"
            style="width: 100px"
          >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-select
            v-model="formProps.model.sortCustom3"
            placeholder="请选择3"
            style="width: 100px"
          >
            <el-option label="餐厅名3" value="1"></el-option>
            <el-option label="订单号3" value="2"></el-option>
            <el-option label="用户电话3" value="3"></el-option>
          </el-select>
        </template>
        <template #file-default>
          <el-button>自定义default，不能有trigger</el-button>
        </template>
        <!-- <template #file-file="{ file }">
          <el-button>自定义file{{ file }}</el-button>
        </template> -->
        <!-- <template #file-trigger>
          <el-button>自定义trigger</el-button>
        </template> -->
        <template #file-tip>
          <div>
            仅允许上传一张图片,如需替换请删除图片后重新上传！(使用了tip插槽)
          </div>
        </template>
        <!-- file类型tip内嵌tag组件,前提要有tip插槽 -->
        <template #file-tag>
          自定义(file类型tip内嵌tag组件，前提要有tip插槽 )
        </template>
        <template #footer="scope">
          <el-button type="primary" @click="submitForm(scope.form)"
            >确 定</el-button
          >
          <el-button @click="cancelDialog()">重 置</el-button>
        </template>
      </aw-form>
      <el-button
        type="primary"
        @click="handle"
        style="width: 150px; margin-top: 20px"
        >手动修改model值</el-button
      >
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { Alarm } from "@icon-park/vue-next";
import type { AwFormInstance } from "@/components/ElementPlugin/types/instance";
import type { Dayjs } from "dayjs";
import { ref, reactive } from "vue";
const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

const options1 = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));
const options2 = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
const querySearch = (queryString: string, cb) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;
  // call callback function to return suggestion objects
  cb(results);
};
const createFilter = queryString => {
  return restaurant => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};
// console.log(AwFormInstance, 89);

const select1 = ref();
const fileList = ref([]);
const formRef = ref<AwFormInstance>();
const formProps = reactive({
  model: {
    text: "",
    autocomplete: "",
    rate: null,
    text1: "",
    number: "",
    inputNumber: null,
    textarea: "",
    daterange: "2022-05-06",
    time: null,
    timeSelect: null,
    select: [],
    selectV2: [],
    treeSelect: [],
    switch: true,
    radio: "",
    radioButton: "",
    checkbox: [],
    checkboxButton: [],
    cascader: [],
    cascaderPanel: [],
    file: [],

    sortCustom: "",
    sortCustom2: "",
    sortCustom3: "",
  },
  props: {
    text: {
      category: "input",
      label: "要显示的",
      hidden: true, //不显示这一子表单项
    },
    autocomplete: {
      category: "autocomplete",
      label: "autocomplete",
      slotNames: ["default", "suffix"],
      "fetch-suggestions": querySearch,
    },
    rate: {
      category: "rate",
      label: "评级",
      slotNames: ["divide"],
    },
    text1: {
      category: "input",
      label: "text1",
      placeholder: "请输入角色名称",
      slotNames: ["prepend", "append"],
    },
    number: {
      category: "number",
      label: "number",
      placeholder: "设置了span为20",
      precision: 2, //这个属性是单独加的，用于控制小数点的位数,默认是整数
      span: 20, //这行代码说明了 props权重大于colProp
    },
    inputNumber: {
      category: "input-number",
      label: "inputNumberinputNumber",
      "controls-position": "right",
      controls: false,
      precision: 0,
    },
    textarea: {
      category: "input",
      type: "textarea",
      label: "textarea",
    },
    daterange: {
      category: "date-picker",
      type: "date",
      label: "daterange",
      slotNames: ["default"],
      format: "YYYY/MM/DD",
      "value-format": "YYYY-MM-DD",
      // "range-separator": "至",
      // "start-placeholder": "开始日期",
      // "end-placeholder": "结束日期"
    },
    time: {
      category: "time-picker",
      type: "datetime",
      label: "time",
      "is-range": true,
      "range-separator": "至",
      "start-placeholder": "开始时间",
      "end-placeholder": "结束时间",
      "value-format": "HH:mm:ss",
      // span: 12,
    },
    timeSelect: {
      category: "time-select",
      label: "time-select",
    },
    select: {
      category: "select",
      label: "select",
      multiple: true,
      slotNames: ["default"],
      options: [
        {
          label: "Popular cities",
          options: [
            {
              value: "Shanghai",
              label: "Shanghai",
            },
            {
              value: "Beijing",
              label: "Beijing",
            },
          ],
        },
        {
          label: "City name",
          options: [
            {
              value: "Chengdu",
              label: "Chengdu",
            },
            {
              value: "Shenzhen",
              label: "Shenzhen",
            },
            {
              value: "Guangzhou",
              label: "Guangzhou",
            },
            {
              value: "Dalian",
              label: "Dalian",
            },
          ],
        },
      ],
    },
    selectV2: {
      category: "select-v2",
      label: "select-v2",
      // multiple: true,
      // filterable: true,
      // clearable: true,
      options: options1,
    },
    treeSelect: {
      category: "tree-select",
      label: "tree-select",
      multiple: true,
      // filterable: true,
      // clearable: true,
      data: options2,
    },
    switch: {
      category: "switch",
      label: "switch",
      "active-color": "#13ce66",
      "inactive-color": "#ff4949",
      "active-text": "后面文本",
      "inactive-text": "前面文本",
    },
    radio: {
      category: "radio",
      label: "radio",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    },
    radioButton: {
      category: "radio-button",
      label: "radio-button",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    },
    checkbox: {
      category: "checkbox",
      label: "checkbox",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "巧克力",
        },
        {
          value: "选项6",
          label: "慕斯蛋糕",
        },
      ],
    },
    checkboxButton: {
      category: "checkbox-button",
      label: "checkbox-button",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true,
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "巧克力",
        },
        {
          value: "选项6",
          label: "慕斯蛋糕",
        },
      ],
    },
    cascader: {
      category: "cascader",
      label: "cascader",
      filterable: true,
      props: { multiple: true },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },

        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
    },
    cascaderPanel: {
      category: "cascader-panel",
      label: "cascader-panel",
      filterable: true,
      props: { multiple: true },
      span: 24,
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },

        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
    },
    file: {
      category: "upload",
      label: "file",
      // listType: "picture",
      "auto-upload": false,
      action: "https://jsonplaceholder.typicode.com/posts/",
      "file-list": fileList.value,
      headers: { Authorization: localStorage.getItem("token") },
      "on-success": (response, file, fileList) => {
        console.log(response, file, fileList, "上传成功");
        // formProps.model["file"] = proxy.$utils.getFormatFileList(
        //   fileList,
        //   formProps.model["file"]
        // );
      },
      "on-progress": (event, file, fileList) => {
        console.log(event, file, fileList);
      },
      slotNames: ["tip", "default", "trigger", "file"],
    },

    sortCustom: {
      category: "custom",
      label: "sortCustom",
    },
    sortCustom2: {
      category: "custom",
      label: "sortCustom2",
    },
    sortCustom3: {
      category: "custom",
      hidden: true,
    },
  },
  rules: {
    text121: [
      {
        required: true,
        message: "角色名称不能为空",
        trigger: "blur",
      },
    ],
    rate: [
      {
        required: true,
        trigger: ["change", "blur"],
        type: "float",
        validator: (rule, value, callback) => {
          if (value !== 0) {
            callback();
          } else {
            callback(new Error("没评级"));
          }
        },
      },
    ],
  },
  methods: {
    autocomplete: {
      select: (item: LinkItem) => {
        console.log(item);
      },
    },
    text1: {
      change: value => {
        console.log(value, "text1的change事件");
        formProps.props["text"].hidden = false;
      },
    },
    number: {
      input: value => {
        console.log(value, "value-number-input");
      },
      change: value => {
        console.log(value, "value-number-change");
      },
    },
    rate: {
      change: () => {
        formRef.value.awFormRef.validateField("rate");
      },
    },
  },
  formProp: {
    "label-position": "top",
    "label-width": "auto",
    "label-suffix": "：",
  },
  formItem: {
    slotNames: ["label"],
  },
});

const holidays = [
  "2022-05-01",
  "2022-05-02",
  "2022-05-03",
  "2022-05-04",
  "2022-05-05",
  "2022-05-06",
  "2022-05-07",
];

const isHoliday = ({ dayjs }: { dayjs: Dayjs }) => {
  return holidays.includes(dayjs.format("YYYY-MM-DD"));
};
interface LinkItem {
  value: string;
  link: string;
}
const links = ref<LinkItem[]>([
  { value: "vue", link: "https://github.com/vuejs/vue" },
  { value: "element", link: "https://github.com/ElemeFE/element" },
  { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
  { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
  { value: "vuex", link: "https://github.com/vuejs/vuex" },
  { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
  { value: "babel", link: "https://github.com/babel/babel" },
]);

function handle() {
  // { text1: "88", number: 99 }是你要修改的model值对象
  formRef.value.setModels({ text1: "88", number: 99 });
}
function submitForm(scope) {
  //由于案例里的input输入框插入了select选择器， 需要自行把数据合并在一起，别忘记做规则校验
  formRef.value.validateForm().then((form: typeof formProps.model) => {
    console.log(formRef.value.getModels(), form, "这是手动获取数据的方法");
  });
  console.log(scope, "提交");
}
function cancelDialog() {
  formRef.value.resetForm();
}
</script>

<style lang="scss" scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.cell.current .text {
  background: #626aef;
  color: #fff;
}
.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
