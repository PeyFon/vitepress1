# 开发规范

## components

- ElementPlugin内所有的组件名字都要Aw开头
- 组件的传参格式尽量相似，减少心智负担
- 公共的方法需要放在ElementPlugin/utils内
- 每个组件都要在types内写入实例类型
- 每个组件都要写name名

## store

- modules内的每个模块的导出名都得是useXxxXxxStore这种格式，如果store是全局的则为useGlobalXxxXxxStore
- 尽量给每个模块编写types类型文件

## utils

- 凡是暴露出去的方法都需要写上注释/** xxxx */

## hooks

- 通常来讲，一个Hook的命名需要以**use开头**，比如useTimeOut，这是约定俗成的，开发者看到useXXX即可明白这是一个Hook。Hook的名称需要清楚地表明其功能。具有一定泛用性的功能，一定复杂度，**需要外部提供初始条件，由模块内部进行状态管理**的功能
- 只在组件生命周期中调用Hook，而不在普通函数中调用Hook xxx(React中的规定，但在Hook概念扩大化后，其实并非绝对)
- 只在当前关注的最顶级作用域使用Hook，而**不要在嵌套函数、循环中调用Hook**  
- 函数必须是纯函数，**没有副作用**
- **返回值**是一个**函数或数据**，供外部使用
  - 它一定是一个非 async 函数（async 函数一定返回 Promise），所以在 Hook 中，一般使用 then 而不是 await 来处理异步请求。
  - 返回值如果是对象，一般在函数中通过 reactive 创建一个对象，最后通过 toRefs 导出，这样做的原因是可以产生批量的可以解构的 Ref 对象，以免在解构返回值时丢失响应性。

- Hook内部可以使用其他的Hook，组合功能
- 数据**必须依赖于输入**，**不依赖于外部状态**，保持数据流的明确性
- 在Hook**内部处理错误**，不要把错误抛出到外部，否则会增加hook的使用成本
- Hook是**单一功能**的，不要给一个Hook设计过多功能。单个Hook只负责做一件事，复杂的功能可以使用多个Hook互相组合实现，如果给单个Hook增加过多功能，又会陷入过于臃肿、使用成本高、难维护的问题中

## 业务文件

- 文件/文件夹的名字使用**驼峰式**，默认是index.vue，当.vue文件是**组件**的话那么该文件名应该为**大驼峰式**

- 所有的自定义指令应放在directives文件夹内

- 单个菜单里**具体业务.vue**内有router-view这种情况原则上只能出现一次

- 不要`let name = ref()`

- 不建议在`template`里使用`$route`和`$router`,因为此写法`vue-tsc`编译不通过

  ```vue
  <template>
    <div @click="$router.push('/')">按钮</div> // [!code --]
    <div @click="router.push('/')">按钮</div> // [!code ++]
  </template>
  ```

- template内可以有多个节点，不在需要一个总节点

  ```vue
  <template>
    <div>1</div>
    <div>2</div>
  </template>
  ```

  

- 一些公共的字段应该写在最上面，store部分的写法如下：

  ```js
  import { useGlobalUserStore, useRouterStore } from "../../store";
  // const { proxy } = getCurrentInstance()
  // const router = useRouter()
  // const route = useRoute()
  const globalUserStore = useGlobalUserStore();
  const routerStore = useRouterStore();
  ```

  

- 业务部分逻辑 应该是一个个代码块，如：

  ```ts
  //table表格
  const tableData = ref([]);
  function getTableData() {
    Role.GetPageList({
      SkipCount: pageSize.value * (currentPage.value - 1),
      MaxResultCount: pageSize.value
    }).then(res => {
      tableData.value = res.data.items;
      total.value = res.data.totalCount;
    });
  }
  function delRow(id: string) {
    Role.Delete({ id: id }).then(() => {
      ElMessage({
        message: "操作成功",
        type: "success"
      });
      getTableData();
    });
  }
  onMounted(() => {
    getTableData();
  });
  
  //tag-table的分页器
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(1);
  watch([currentPage, pageSize], () => {
    getTableData();
  });
  
  //弹窗部分
  const dialogProps = reactive({
    show: false,
    id: "",
    title: ""
  });
  const formRef = ref<AwFormInstance>();
  ```

- ts的声明类型应该写在业务的最上面即顶部

- 如果此.vue文件需要暴露出`name、inheritAttrs` 的话可以使用`defineOptions()`函数，此函数不再需要单独import引用。

  - 相关链接参考：
    - https://cn.vuejs.org/api/sfc-script-setup.html#usage-alongside-normal-script    

    - https://cn.vuejs.org/guide/extras/composition-api-faq.html#does-composition-api-cover-all-use-cases

- style内的`::v-deep`应该替换为`:deep(xxx)`

- 对于一些颜色的样式最好使用--el-text-color-regular这种，如：`color：var(--el-text-color-primary)`