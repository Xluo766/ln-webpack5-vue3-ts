// import { sendName } from "./home";
// if (new Date().getSeconds() > 30) {
//   const name = sendName("6");
//   console.log(name);
// }

// const promiseArray = [new Promise(() => {}), new Promise(() => {})];
// promiseArray.map((promise) => {
//   console.log(promise);
// });

// // async function func123() {}
// // class Func123 {}

// // let a123456 = 1;

// // Array.from([1, 2, 3]).forEach((a) => {
// //   console.log(a);
// // });

// // console.log(WEBPACK_FUNC());

// import { createApp } from "vue";
// import App from "@/App.vue";
// import "@/style/index.scss";
// import "@/style/a.css";
// const app = createApp(App);
// app.mount("#app");

// import imgUrl from "@/assets/10kb.jpeg";
// const imgEL = new Image();
// imgEL.src = imgUrl;
// document.body.appendChild(imgEL);

// import { join } from "lodash-es";

// console.log(join(["Another", "module", "loaded!"], " "));

// let name = "sss";
// export const sendName = (s: string) => {
//   if (new Date().getSeconds() > 30) {
//     name = "test" + s;
//   }
//   console.log(name);

//   return name;
// };

// sendName("1");

debugger;
import("./home").then((res) => {
  res.sendName();
});
