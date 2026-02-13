# 模板项目说明

## 准备工作📚

由于目前没有搭建脚手架，因此有些事项需要额外注意：

- 模板自带3个单页：`index、业务、system`，当除此之外还需要额外的单页时，请不要复制system单页，应复制业务单页，同时在**菜单管理-开发者**内创建相关单页tab。
- 有多个单页时，应复制出相应的html文件，同时更改html的`title`和`script`，或者自己去[ awesome-vite](https://github.com/vitejs/awesome-vite)找插件解决（搜索mpa）。不内置是为了方便设置`class="dark"`。
- index单页主要用来登录，若项目不需要这么多单页的话，只能自己手动把相关代码合并在一个单页上。
- 根据实际项目开发需要自行修改`store/modules/setting/index`配置
::: warning 💡 友情提示
- 由于 Vue3 不再支持 IE 浏览器环境，因此模板项目没做polyfill
- 在开发阶段中，Vite 的开发服务器将所有代码视为原生 ES 模块。因此，Vite 必须先将以 CommonJS 或 UMD 形式提供的依赖项转换为 ES 模块。所以模板项目未对require做兼容，建议开发使用**ESM规范**。或者自己去[ awesome-vite](https://github.com/vitejs/awesome-vite)找插件解决
:::

## 脚本指令

#### 创建api文件

```
npm run create-api
```

#### 根据菜单创建基础页面

```
npm run create-page
```
#### 导出git日志

```
npm run export-gitLog
```

## 关于.vscode

### 使用部分：

- extensions.json文件内是一些需要的vscode插件
- settings.json文件内是一些通用的代码规范
- vue.code-snippets内有代码块用于快速生成基础代码

## 关于store

### 使用部分：

- 模块化处理，所有模块都存放在modules里面
- 一些公共的数据的来源/接口请求原则上是写在每个模块的actions里面，外部只需要调用其封装的方法。（如：路由、用户登录信息）
- 所有的设置存放在各自(index、system单页)下的store/modules/setting。**注：整个系统的标题名需要去修改html文件**

## 关于logo

### 使用部分：

- 菜单内的logo固定高度是50，若修改了header文件（height 60px）则logo高度也要跟着修改。
- logo的宽度是根据store内的sidebarWidth-20padding计算出来的。sidebarWidth是左侧菜单栏的宽度。
- logo的设置存放在 各自(index、system)下的store/modules/setting。
- 若要替换logo图片请直接修改其logo文件。

## 关于icon

### 插件部分：

- 图标只使用icon-park，排除掉element-plus自带图标。*因为样式不统一。*
- 使用了unplugin-icons插件，用于自动引入（仅限于静态使用），目前图标集里只放入了icon-park，不做自动安装。*因为做自动安装有可能出现图标集部分名称重合导致打包出错，要避免还得配置别名，同时修改相应的组件名。*
- 配合[unocss](https://github.com/unocss/unocss)，可以实现类似font-class的形式，查看下方的**方式4**
- 相关链接：
  - https://icones.js.org/collection/icon-park
  - https://iconpark.oceanengine.com/home


### 使用部分：

- 在**动态菜单**部分必须从icon-park官网上把icon组件下载下来，放在components里，（已在utils里做了全局注册，仅需替换components/icons文件夹，不要只把vue文件放进去）

- 在其他页面上的使用建议都是用按需引用的方式，目前的自动引入插件无法在动态组件如：  `<component class="xxxx" :is="xxxx"></component>  <el-input v-model="value1" :prefix-icon="xxxx" type="password"></el-input>`上使用。**解决方案**：1、提前把icon组件下载下来做全局注册。2、使用import { XxxXxxx } from "@icon-park/vue-next";

- 输入`icon-park`会生成`import { } from "@icon-park/vue-next";`代码块

- 使用方式：

  ```javascript
  //方式1：（推荐使用）
  //（首字母大写）
  import { BookmarkOne, DocSearchTwo, Search, Lock } from "@icon-park/vue-next";
  
  //方式2：
  import IconParkLock from "~icons/icon-park/lock";
   <IconParkLock />
  
  //方式3：（自动引用，适用于静态组件）
  //IconPark组件名 或 icon-park-组件名
  <IconParkDocSearchTwo />
  <icon-park-doc-search-two />
  //方式4：与unocss配合使用
  <div class="i-icon-park-acceleration"></div>
  <div i-icon-park-acceleration></div>
  ```

## 关于路由/菜单

### 使用部分：

- 若菜单配置了带有颜色的图标icon，那么在collapse收缩菜单栏后其带颜色的图标不会跟着去改变颜色
- 当在开发模式下会自动创建  **菜单管理-开发者** 和 **按钮权限-开发者**这两个页面，它们在打包后会自动排除掉
- 菜单可以拖拽排序，但只能是同级别。因为涉及到redirect重定向，如果随便跨级别会使redirect混乱失效
- 创建菜单的基础知识链接：https://router.vuejs.org/zh/guide/essentials/nested-routes.html

#### 创建菜单说明：

- path：仅用于url，component用于表示具体的文件路径。
  - 注：path最好与component一致。
  - 若使用[ 动态路由](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)目前只支持最后一级/是冒号 `：`，此功能少用，不推荐。

- name：当输入path的时候会自动生成一个name，但名字不严谨，可以自己修改下。
  - 注意：**name必须唯一，绝对不能跟整个菜单里的name重复**，其名字主要用于配合keep-alive缓存。
- component：
  - 当创建的菜单用于折叠展示**不代表具体业务页面**的时候：通常情况下，一级菜单请选择Layout，二级菜单及其之后请选择Section。若是如**大屏版**或者**具体业务.vue**内有router-view这种界面，则直接写具体业务页面路径。
  - 当创建的菜单是**具体业务页面**的时候，请输入具体的路径。
    - 当路径的最后一级**不带.vue**时（如：/userManagement/index），那么在使用*create-page*脚本生成文件的时候结果为：userManagement文件夹 →  index文件夹  →  index.vue文件
    - 当路径的最后一级**带.vue**时（如：/userManagement/index.vue），那么在使用*create-page*脚本生成文件的时候结果为：userManagement文件夹   →  index.vue文件
  - 原则上单个菜单里**具体业务.vue**内有router-view这种情况只能出现一次
- meta内的显示/隐藏：它只代表是否在菜单栏上是否显示，并**不是**说此路由不存在。当父级隐藏时，它的子级全部隐藏
- redirect：
  - **当此菜单的子级全部都是隐藏时必填！！！**，填写的内容为需要重定向的子级的path
  - 当子级至少一个显示时可以不用填写，会自动处理为**重定向到子级内第一个显示的菜单**
  - 当没有子级时不用填写

#### 路由结构示例：

```js
{
  id: "contract/modify/step1",
  parentId: "3a0a13fc-6519-1c56-5e96-1c55d52e672c",
  path: "/operation/contract/modify/step1",
  name: "operation-contract-modify-step1",
  component: "/operation/contract/modify/step1.vue",
  meta: {
    title: "clipboard", //标题中文名
    icon: "iconcopy", //图标
    hidden: false, //是否隐藏
    frameUrl: "", //外链
    noCache: true //没有缓存
  },
  children: []

},
```

#### keep-alive缓存说明：

##### 生效条件：

- `store\modules\setting\index.ts`文件内的`openCache:true`。注：这是一个顶层的keep-alive开关默认为true
- 开启缓存，即路由内的`meta.noCache`值为`true`
- 路由的`name`与vue文件的`name`相同。注：[关于name的官方说明](https://cn.vuejs.org/api/options-misc.html#name)

##### 特别说明：

1. 为了减少部分心智负担，在运行*create-page*脚本的时候会根据情况适时生成文件name名：`defineOptions({name: "文件名"});`，但如果vue文件是手动创建的则需要自己声明`name`。
2. 当与**tag组件**配合使用的时候(tag组件的设置在`store\modules\setting\index.ts`内)，能够自动动态控制keep-alive的最大缓存数，最大缓存数与打开的tag数成正比。
3. 如果路由层级嵌套很深又需要`kepp-alive`缓存，那你需要自己在业务页额外写一层`<keep-alive>.....</keep-alive>`



## 关于主题

### 使用部分：

- light模式代码存放在styles/element/index.scss文件内

- dark模式代码存放在styles/element/dark.scss文件内

- 若E项目确定**只使用dark模式**，则可以参考[ ElementPlus的配置方案](https://element-plus.org/zh-CN/guide/dark-mode.html)：

  - ```html
    <html class="dark">
      <head></head>
      <body></body>
    </html>
    ```

  - ```ts
    //main.ts
    // 如果只想导入css变量
    import 'element-plus/theme-chalk/dark/css-vars.css'
    ```

- 若想自定义 请查看styles/index.scss文件如下内容：

  ```scss
  /*若想全部自定义 则使用下方的root和dark*/
  :root {
    --theme-overlay: var(--el-bg-color-page);
  }
  /* 更改dark类名下变量的取值 */
  .dark {
    --theme-overlay: var(--el-bg-color-overlay);
  }
  ```

- **为了在模式切换时能够正常显示样式，尽量在赋值的时候选用--el-color-success这种值**，当没有合适的时候需要自己去自定义

## 关于组件

### 使用部分：

- 所有组件的名字统一为Aw开头

- 如果组件需要实例ref，写法如下：

  ```ts
  import { AwFormInstance } from "@/components/ElementPlugin/types/instance";
  const formRef = ref<AwFormInstance>();
  ```

## 关于utils

### 使用部分：

- 凡是暴露出去的方法都需要写上jsDoc注释/** xxxx */
- 当需要的方法没有的时候尽量先去vueUse或者@pureadmin/utils上面去找
- 相关链接：
  - https://vueuse.org/ 
  - https://pure-admin-utils.netlify.app/guide/guide 

## 关于axios

### 使用部分：

- 开启全局mock仅需要修改mock的代理地址和`.env`文件内的`VITE_APP_ISMOCK`字段

- 若仅部分接口需要mock则需要在接口额外传入参数  `{ isMock: true}` ，反之亦然`{ isMock: false}`

- 传参结构：

  - 接口传参由path、query(_params)、body(_body)三部分组成

  - `path：{key：value}`

  - `query：{_params:{key：value}}`

  - `body:{_body:{key：value}}`
