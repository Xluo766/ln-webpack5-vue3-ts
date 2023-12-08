module.exports = {
  presets: [
    // 预设从后往前先处理ts,再处理js
    [
      "@babel/preset-env",
      {
        // 设置兼容目标浏览器
        targets: {
          chrome: "58",
          ie: "11",
        },
        // 自动引入core-js根据目标浏览器按需使用打补丁
        useBuiltIns: "usage",
        //  一般是指定 3，这个会 polyfill 实例方法，而 corejs2 不会
        corejs: 3,
      },
    ],
    [
      "@babel/preset-typescript",
      {
        //表示每个文件都应该被解析为 TS、TSX
        allExtensions: true,
      },
    ],
  ],
  // plugins: [
  //   [
  //     "@babel/plugin-transform-runtime",
  //     {
  //       // 从@babel/runtime-corejs3 引入polyfill
  //       corejs: 3,
  //     },
  //   ],
  // ],
};
