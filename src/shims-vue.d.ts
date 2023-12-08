// .vue 文件不是一个常规的文件类型，告诉 TypeScript 编译器，
// .vue 结尾的文件应该被视为 Vue 的单文件组件
// 没有这个文件 import .vue 类型的文件会报错。

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
