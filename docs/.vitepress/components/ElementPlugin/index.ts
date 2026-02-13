import type { App } from "vue";
import AwCropperPhoto from "./AwCropperPhoto/index.vue";
import AwForm from "./AwForm/index.vue";
import AwTableColumnSearch from "./AwTableColumnSearch/index.vue";
import AwFileList from "./AwFileList/index.vue";
import AwPreviewImage from "./AwPreviewImage/index.vue";
import AwPreviewPdf from "./AwPreviewPdf/index.vue";
import AwPreviewVideo from "./AwPreviewVideo/index.vue";
import AwInfo from "./AwInfo/index.vue";
import AwInfoItem from "./AwInfo/AwInfoItem.vue";
import AwSearchQuery from "./AwSearchQuery/index.vue";
import AwEditTable from "./AwEditTable/index.vue";
import AwInputNumber from "./AwInputNumber/index.vue";
import PivotTable from "./PivotTable/index.vue";
import AwPivotTable from "./AwPivotTable/index.vue";

// const files = require.context(
//   "@/components/ElementPlugin",
//   true,
//   /index\.vue$/
// );

const componentsMap = {
  AwCropperPhoto,
  AwForm,
  AwTableColumnSearch,
  AwFileList,
  AwPreviewImage,
  AwPreviewPdf,
  AwPreviewVideo,
  AwInfo,
  AwInfoItem,
  AwSearchQuery,
  AwEditTable,
  AwInputNumber,
  PivotTable,
  AwPivotTable
};

export default {
  install(app: App<Element>) {
    Object.keys(componentsMap).forEach(name => {
      app.component(componentsMap[name].name, componentsMap[name]);
    });
  }
};
