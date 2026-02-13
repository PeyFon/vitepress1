# AGENTS.md

此文件为 AI 代理（如你）在本项目中工作时的权威指南。请仔细阅读并遵守。

## 1. 项目概览

本项目是一个基于 VitePress 的文档和组件库项目。
- **文档根目录**: `docs`
- **组件库源码**: `docs/.vitepress/components/ElementPlugin`
- **示例代码**: `docs/examples` 和 `docs/.vitepress/demos`
- **核心依赖**: Vue 3, Element Plus, VitePress

## 2. 常用命令

由于本项目没有配置显式的测试脚本，主要关注文档的构建与开发。

- **启动开发服务器**: `npm run docs:dev` (默认端口通常为 5173)
- **构建生产文档**: `npm run docs:build`
- **预览生产构建**: `npm run docs:serve`
- **运行测试**: 虽然 `package.json` 中包含 `jest`，但未配置 `test` 脚本。若需运行测试，尝试 `npx jest`。

## 3. 代码风格与规范 (重要)

请严格遵守 `docs/guide/specification.md` 中的规定。

### 命名规范
- **文件/文件夹**: 使用 **驼峰式 (camelCase)**。
- **Vue 组件文件**: 使用 **大驼峰式 (PascalCase)** (如 `AwButton.vue`)。
- **组件名称**: `ElementPlugin` 内的所有组件必须以 `Aw` 开头 (如 `AwCropperPhoto`)。
- **Store**: `useXxxXxxStore` (模块) 或 `useGlobalXxxXxxStore` (全局)。
- **Hooks**: 必须以 `use` 开头 (如 `useTimeOut`)。

### 组件开发
- **位置**: 新组件应放在 `docs/.vitepress/components/ElementPlugin` 下。
- **Props**: 保持与其他组件一致的传参格式。
- **Types**: 每个组件必须在 `types` 目录内定义实例类型，并在组件顶部导入。
- **Name**: 每个组件必须定义 `name` 属性 (推荐使用 `defineOptions({ name: 'AwXxx' })`)。
- **公共方法**: 放在 `ElementPlugin/utils` 中。

### Vue 最佳实践
- **Router**: 在 template 中使用 `router.push` 而不是 `$router.push`。
- **Root Node**: 支持多个根节点，不需要包裹在一个 `div` 中。
- **Styles**: 使用 `:deep(xxx)` 替代 `::v-deep`。
- **Colors**: 使用 CSS 变量 (如 `var(--el-text-color-primary)`)。
- **Logic Organization**: 
  1. Imports
  2. Types
  3. Store/Hooks
  4. Business Logic (grouped by feature)
  5. Lifecycle methods

### 文档编写
- **位置**: 在 `docs/examples/[component-name]` 下创建 `index.md`。
- **示例**: 在 `docs/.vitepress/demos/[component-name]` 下创建 `.vue` 示例文件。
- **配置**:
  - 在 `docs/.vitepress/utils/` 下对应的分类文件 (如 `general.js`) 中添加侧边栏链接。
  - 格式: `{ text: 'Button 按钮', link: '/examples/button/' }`。

### 语言
- **文档与注释**: 必须使用 **简体中文**。
- **JSDoc**: 暴露出的工具函数必须编写 JSDoc 注释。

## 4. 测试
虽然没有强制的 CI 流程，但在修改核心逻辑或工具函数后，请尽量编写或运行相关的 Jest 测试 (如果存在)。

## 5. 提交规范
- 提交前请确保代码格式化 (Prettier/ESLint)。
- 提交信息应简洁明了，描述修改的内容。
