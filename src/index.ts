import { sendName } from "./home";
if (new Date().getSeconds() > 30) {
  const name = sendName("6");
  console.log(name);
}

// const promiseArray = [new Promise(() => {}), new Promise(() => {})];
// promiseArray.map((promise) => {
//   console.log(promise);
// });

// // async function func123() {}
// // class Func123 {}

// // let a123456 = 1;

// Array.from([1, 2, 3]).forEach((a) => {
//   console.log(a);
// });

// // console.log(WEBPACK_FUNC());

// import "@/style/index.scss";
import "@/style/index.scss";

import { createApp } from "vue";
import App from "@/App.vue";
const app = createApp(App);
app.mount("#app");

// import { sendName } from "./home";

// import imgUrl from "@/assets/10kb.jpeg";
// const imgEL = new Image();
// imgEL.src = imgUrl;
// document.body.appendChild(imgEL);

import { join } from "lodash-es";
console.log(join(["Another", "module", "loaded!"], " "));

// let name = "sss";
// export const sendName = (s: string) => {
//   if (new Date().getSeconds() > 30) {
//     name = "test" + s;
//   }
//   console.log(name);

//   return name;
// };

// sendName("1");

// const btnEl = document.createElement("button");
// btnEl.textContent = "import导入";
// btnEl.onclick = function () {
//   import(
//     /* webpackPrefetch: true */
//     /* webpackChunkName: "home" */
//     "./home"
//   ).then((res) => {
//     res.sendName();
//   });
// };
// document.body.appendChild(btnEl);

import { cube } from "./home";

function component() {
  const element = document.createElement("pre");

  // lodash 现在使用 import 引入
  element.innerHTML = ["你好 webpack！", "5 的立方等于 " + cube(5)].join(
    "\n\n"
  );

  return element;
}

document.body.appendChild(component());
