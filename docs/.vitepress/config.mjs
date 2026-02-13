import { markdownConfig } from "./plugins/code-plugin";
import { fileURLToPath, URL } from "node:url";
// import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vitepress";

// console.log(22, fileURLToPath(new URL("./", import.meta.url)));
export default defineConfig({
  markdown: {
    config: md => markdownConfig(md)
    // lineNumbers: true,
  },
  vite: {
    // Vite config options
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url))
      }
    },
    ssr: {
      // Add libraries containing invalid ESM here
      noExternal: ["vue-cropper", "@videojs-player/vue"]
    },

    plugins: [
      // AutoImport({
      //   include: [
      //     /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      //     /\.vue$/,
      //     /\.vue\?vue/, // .vue
      //     // /\.md$/ // .md
      //   ],
      //   //引入element plus自动api支持
      //   // resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      //   imports: ["vue", "pinia", "vue-router"],
      //   //为true时在项目根目录自动创建
      //   dts: "./auto-imports.d.ts",
      //   // eslint报错解决
      //   //   eslintrc: {
      //   //     enabled: true, // Default `false`
      //   //     filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
      //   //     globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      //   //   },
      //   // }),
    ]
  },
  base: "/vitepress1/",
  description: "基础组件", //介绍
  lang: "cn-ZH",
  title: "基础组件库",
  lastUpdated: true,
  cleanUrls: true,
  head: [["link", { rel: "icon", href: "/logo.png" }]], //要在页面 HTML 的标记中呈现的其他元素
  themeConfig: {
    siteTitle: "AWING-乘正科技",
    logo: "/logo.png",
    lastUpdatedText: "最近更新",
    outlineTitle: "页面目录",
    outline: [2, 4],
    //页面右上角的导航
    nav: [
      { text: "开发指南", link: "/guide/template", activeMatch: "/guide/" },
      {
        text: "组件使用",
        link: "/examples/form/",
        activeMatch: "/examples/"
      },
      {
        text: "项目相关文档",
        items: [
          {
            text: "组件",
            items: [
              {
                text: "Element Plus",
                link: "https://element-plus.gitee.io/zh-CN/"
              },
              {
                text: "ECharts",
                link: "https://echarts.apache.org/zh/index.html"
              }
            ]
          },
          {
            text: "Hooks & Utils",
            items: [
              { text: "VueUse", link: "https://vueuse.org/guide/" },
              {
                text: "@pureadmin/utils",
                link: "https://pure-admin-utils.netlify.app/guide/guide"
              }
            ]
          },
          {
            text: "CSS",
            items: [
              {
                text: "Tailwind CSS",
                link: "https://tailwindcss.com/docs/installation"
              },
              { text: "UnoCSS", link: "https://unocss.dev/guide/" },
              {
                text: "PostCSS ",
                link: "https://www.postcss.parts/"
              }
            ]
          },
          {
            text: "Icon",
            items: [
              {
                text: "IconPark",
                link: "https://iconpark.oceanengine.com/official"
              },
              {
                text: "Icônes",
                link: "https://icones.js.org/collection/icon-park"
              }
            ]
          }
        ]
      },
      {
        text: "图形相关文档",
        items: [
          {
            text: "DC",
            items: [
              {
                text: "DC-SDK 开发文档-教程",
                link: "https://resource.dvgis.cn/dc-docs/v2.x/zh/introduction/"
              },
              {
                text: "DC-SDK 开发文档-API参考",
                link: "http://resource.dvgis.cn/dc-api/dc-sdk/"
              },
              {
                text: "DC-开发示例",
                link: "https://dc.dvgis.cn/#/examples"
              }
            ]
          },
          {
            text: "Cesium",
            items: [
              {
                text: "Cesium中文网",
                link: "http://cesium.xin/cesium/cn/Documentation1.72/index.html"
              },
              {
                text: "Cesium Sandcastle",
                link: "https://sandcastle.cesium.com/"
              }
            ]
          },
          {
            text: "ShaderToy",
            items: [
              {
                text: "SDF模型",
                link: "https://www.shadertoy.com/view/MsVGWG"
              },
              {
                text: "inter-illusion-SDF Font Maker",
                link: "http://inter-illusion.com/assets/I2SmartEdgeManual/SmartEdge.html?SDFFontMaker.html"
              }
            ]
          },
          {
            text: "基础&底层&书籍...",
            items: [
              {
                text: "OpenGL® 4.5 API and GLSL",
                link: "https://registry.khronos.org/OpenGL-Refpages/gl4/"
              },
              { text: "OpenGL® 4.6", link: "https://www.khronos.org/opengl/" },
              {
                text: "Fragment Shaders（片段着色器入门指南）",
                link: "https://www.postcss.parts/"
              },
              {
                text: "glsl基础（掘金）",
                link: "https://juejin.cn/column/7175340578798829624"
              },
              {
                text: "WebGPU相关集合",
                link: "https://github.com/mikbry/awesome-webgpu"
              },
              {
                text: "DAE",
                link: "https://docs.fileformat.com/zh/3d/dae/"
              }
            ]
          }
        ]
      }
    ],
    socialLinks: [
      {
        icon: {
          svg: '<svg t="1681913325130" class="icon" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3062" width="16" height="16"><title>蓝湖</title><path d="M516.161223 0.286981C234.202497 0.286981 5.283057 229.199898 5.283057 511.158624s228.919439 510.871643 510.878166 510.871644c281.958726 0 510.871643-228.912917 510.871643-510.871644S798.119949 0.286981 516.161223 0.286981z m0 21.738802c269.957707 0 489.132841 219.175134 489.132841 489.132841s-219.175134 489.132841-489.132841 489.132841c-269.964229 0-489.132841-219.175134-489.132841-489.132841S246.196994 22.025783 516.161223 22.025783z" fill="#6D6D72" p-id="3063"></path><path d="M93.601427 354.056153c32.383185-87.092178 90.90772-161.518064 166.005401-213.735542a10.872662 10.872662 0 0 0-12.411924-17.844993c-78.70451 54.715516-140.033631 132.72214-173.969121 224.00163a10.872662 10.872662 0 0 0 20.375644 7.578905zM307.265223 110.057172a448.251108 448.251108 0 0 1 92.610038-35.585631 10.879185 10.879185 0 0 0-5.504815-21.034395 469.689885 469.689885 0 0 0-97.097376 37.314039 10.872662 10.872662 0 0 0 9.992153 19.305987z" fill="#6D6D72" p-id="3064"></path><path d="M498.316229 538.050038c190.783592 0 176.310624-96.725605 309.293656 0 48.956331 35.605197 170.760153-91.214268 170.760153-26.891414 0 255.099924-207.108892 462.208815-462.208815 462.208815-255.099924 0-462.208815-207.108892-462.208815-462.208815 0-105.348076 65.627312-14.812127 136.413758-82.422216 140.646726-134.339669 158.198217 109.313631 307.950063 109.31363z" fill="#6D6D72" fill-opacity=".3" p-id="3065"></path><path d="M737.730038 298.83842m-15.920917 0a15.920917 15.920917 0 1 0 31.841834 0 15.920917 15.920917 0 1 0-31.841834 0Z" fill="#6D6D72" p-id="3066"></path><path d="M721.809121 168.33386a31.020025 31.020025 0 0 0-31.006981 31.006981 31.020025 31.020025 0 0 0 31.006981 31.006981 31.020025 31.020025 0 0 0 31.006981-31.006981 31.020025 31.020025 0 0 0-31.006981-31.006981z m0 10.86614a20.140841 20.140841 0 1 1-20.140841 20.140841 20.153885 20.153885 0 0 1 20.140841-20.140841zM837.40372 301.812586a43.516739 43.516739 0 0 0-43.497172 43.497172 43.516739 43.516739 0 0 0 43.497172 43.497172 43.516739 43.516739 0 0 0 43.497172-43.497172 43.516739 43.516739 0 0 0-43.497172-43.497172z m0 10.872662a32.644076 32.644076 0 0 1 32.631032 32.62451 32.644076 32.644076 0 0 1-32.631032 32.62451 32.644076 32.644076 0 0 1-32.62451-32.62451 32.644076 32.644076 0 0 1 32.62451-32.62451zM803.794344 227.49758h-8.563771a3.678573 3.678573 0 1 0 0 7.357146h8.563771v8.563771a3.672051 3.672051 0 1 0 7.350624 0v-8.563771h8.563771a3.672051 3.672051 0 1 0 0-7.357146h-8.563771v-8.557249a3.672051 3.672051 0 1 0-7.350624 0v8.557249zM660.832204 263.324535h-8.563771a3.678573 3.678573 0 1 0 0 7.357147h8.563771v8.56377a3.685096 3.685096 0 0 0 7.357146 0v-8.56377h8.563771a3.685096 3.685096 0 0 0 0-7.357147h-8.563771V254.760764a3.685096 3.685096 0 0 0-7.357146 0v8.563771zM516.148178 738.310522c52.484892 0 73.525809-26.878369 73.525809-26.878369 40.659975-36.877045 62.894471-11.113987 83.65493-3.404637 57.644025 21.406166 71.151694-24.249885 45.395159-44.527694-67.597045-53.208866-50.913019-193.568611-50.913019-193.568612 3.815541-73.291006-41.860076-107.767847-41.860076-107.767847 0.332637-7.976764 37.235771-72.47572 22.606267-77.797911-14.629503-5.315669-67.825325 49.869452-67.825324 49.869452-34.372484-19.195108-47.788841-20.434344-65.131618-20.434343-16.566624 0-28.44372 0.821809-64.016306 20.434343 0 0-53.195822-55.185121-67.818803-49.869452-14.629503 5.322191 22.273631 69.821146 22.606268 77.797911 0 0-47.012688 32.99628-43.008 107.767847 0 0 17.825427 140.359745-49.765096 193.568612-25.756535 20.277809-12.248866 65.93386 45.388637 44.527694 20.760459-7.70935 43.001478-33.472408 83.65493 3.404637 0 0 21.693146 26.878369 73.506242 26.878369z m7.318013-362.345987c51.858752 0 93.966675 42.107924 93.966675 93.966675 0 51.865274-42.107924 93.966675-93.966675 93.966675-51.865274 0-93.966675-42.101401-93.966675-93.966675 0-51.858752 42.101401-93.966675 93.966675-93.966675z" fill="#6D6D72" p-id="3067"></path><path d="M547.266038 461.713121m-49.445503 0a49.445503 49.445503 0 1 0 98.891006 0 49.445503 49.445503 0 1 0-98.891006 0Z" fill="#6D6D72" p-id="3068"></path></svg>'
        },
        link: "https://lanhuapp.com/dashboard/#/item?fid=all&tid=79c7ea29-45ca-4472-9237-f3ab53a4f692"
      },
      {
        icon: {
          svg: '<svg t="1681912321404" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2791" width="16" height="16"><title>Azure DevOps</title><path d="M0 379.690667l95.872-126.549334 358.613333-145.749333V1.92l314.453334 230.101333L126.549333 356.693333v350.890667L0 671.146667z m1024-189.866667v625.152L778.538667 1024l-396.928-130.389333V1024l-255.061334-316.416 642.432 76.714667V232.021333z" p-id="2792" fill="#6D6D72"></path></svg>'
        },
        link: "http://192.168.0.31/DefaultCollection"
      },
      {
        icon: {
          svg: '<svg t="1682069727072" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2301" width="16" height="16"><title>语雀</title><path d="M854.6 370.6c-9.9-39.4 9.9-102.2 73.4-124.4l-67.9-3.6s-25.7-90-143.6-98c-117.9-8.1-195-3-195-3s87.4 55.6 52.4 154.7c-25.6 52.5-65.8 95.6-108.8 144.7-1.3 1.3-2.5 2.6-3.5 3.7C319.4 605 96 860 96 860c245.9 64.4 410.7-6.3 508.2-91.1 20.5-0.2 35.9-0.3 46.3-0.3 135.8 0 250.6-117.6 245.9-248.4-3.2-89.9-31.9-110.2-41.8-149.6z" p-id="2302" fill="#6D6D72"></path></svg>'
        },
        link: "https://awingtech.yuque.com/r/ghv3qq/books?q="
      }
    ],
    //侧边导航
    sidebar: {
      "/guide/": [
        {
          text: "开发指南",
          items: [
            {
              text: "模板项目",
              link: "/guide/template"
            },
            {
              text: "三维平台",
              link: "/guide/mapwing"
            },
            {
              text: "开发规范",
              link: "/guide/specification"
            },
            {
              text: "其他",
              link: "/guide/log"
            }
          ]
        }
      ],
      "/examples/": [
        {
          text: "通用组件",
          collapsed: false,
          items: [
            {
              text: "AwForm",
              link: "/examples/form/"
            },
            {
              text: "AwTableColumnSearch",
              link: "/examples/tableColumnSearch/"
            },
            {
              text: "AwEditTable",
              link: "/examples/editTable/"
            },
            {
              text: "AwFileList",
              link: "/examples/fileList/"
            },
            {
              text: "AwSearchQuery",
              link: "/examples/searchQuery/"
            },
            {
              text: "AwInfo",
              link: "/examples/info/"
            },
            {
              text: "AwPivotTable",
              link: "/examples/pivotTable/"
            }
          ]
        },
        {
          text: "基础组件",
          collapsed: false,
          items: [
            {
              text: "AwInputNumber",
              link: "/examples/inputNumber/"
            },
            {
              text: "AwPreviewImage",
              link: "/examples/previewImage/"
            },
            {
              text: "AwPreviewPdf",
              link: "/examples/previewPdf/"
            },
            {
              text: "AwPreviewVideo",
              link: "/examples/previewVideo/"
            },
            {
              text: "AwCropperPhoto",
              link: "/examples/cropperPhoto/"
            }
          ]
        }
      ]
    },
    footer: {
      message: "乘正科技前端组件使用",
      copyright: "Copyright © 2023-现在 Awing"
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    }
    // editLink: {
    //   pattern:
    //     "https://github.com/ox4f5da2/seven-bit-docs/tree/master/docs/:path",
    //   text: "在 GitHub 上编辑此页面",
    // },
    // algolia: {
    //   appId: "RHX6KGJ4PT",
    //   apiKey: "9ccfcfff5b8b2ca6318229be055a524b",
    //   indexName: "chocn",
    //   placeholder: "请输入关键词",
    //   translations: {
    //     button: {
    //       buttonText: "搜索文档"
    //     }
    //   }
    // }
  }
});
