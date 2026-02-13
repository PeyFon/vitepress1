/* eslint-env node */
// require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "prettier",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "./.eslintrc-auto-import.json", //不能删
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true, // 只需将该项设置为 true 即可
  },
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/prefer-default-export": "off",
    "vue/valid-attribute-name": "off",
    "vue/multi-word-component-names": "off", //不能删
    "@typescript-eslint/no-var-requires": 0, //不能删
    "@typescript-eslint/no-explicit-any": "off", //关闭any类型警告
    "@typescript-eslint/no-non-null-assertion": "off", // 不允许使用后缀运算符的非空断言(!)
    "linebreak-style": [0, "error", "windows"],
  },
  globals: {
    defineOptions: true,
    DC: true,
  },
};
