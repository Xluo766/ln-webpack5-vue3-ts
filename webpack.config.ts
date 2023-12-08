import * as webpack from "webpack";
import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const resolve = (dir: string) => path.resolve(__dirname, dir);

const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    environment: {
      //生产打包输出普通函数IIFE
      arrowFunction: false,
    },
  },
  resolve: {
    extensions: [".vue", ".ts", ".less", "..."],
    alias: {
      "@": resolve("./src"),
      "@/assets": resolve("./src/assets"),
      "@/style": resolve("./src/style"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack5+Vue3+ts",
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      // 只影响最初加载的输出css文件
      filename: "style/[name]_[hash:8].css",
      // 按需加载的 chunk 文件
      chunkFilename: "style/[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        //排除 node_modules 目录
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // 从vue文件分离出来的ts内容会加上ts后缀给ts-loader处理
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      },
      // {
      //   test: /\.ts$/,
      //   exclude: /node_modules/,
      //   use: "babel-loader",
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset",
        parser: {
          // 图片小于20kb，会被解析为一个 Base64 编码的字符串注入到包中，
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
        generator: {
          // 此选项被称为文件名，但还是可以使用像 'js/[name]/bundle.js' 这样的文件夹结构
          filename: "image/[name]_[hash:10][ext]",
        },
      },
    ],
  },
};

export default config;
