import { sendName } from "./home";
if (new Date().getSeconds() > 30) {
  const name = sendName();
  console.log(name);
}

// const promiseArray = [new Promise(() => {}), new Promise(() => {})];
// promiseArray.map((promise) => {
//   console.log(promise);
// });

// async function func123() {}
// class Func123 {}

// let a123456 = 1;

// Array.from([1, 2, 3]).forEach((a) => {
//   console.log(a);
// });

// console.log(WEBPACK_FUNC());



import { createApp } from "vue";
import App from "@/App.vue";

import "@/style/index.scss";
import "@/style/a.css";

const app = createApp(App);
app.mount("#app");

import imgUrl from "@/assets/242kb.jpg";
const imgEL = new Image();
imgEL.src = imgUrl;
document.body.appendChild(imgEL);
