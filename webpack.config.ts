import * as webpack from "webpack";
import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const resolve = (dir: string) => path.resolve(__dirname, dir);

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    clean: true,
    environment: {
      //生产打包输出普通函数IIFE
      arrowFunction: false,
    },
  },
  devServer: {
    // port: 999, // 服务端口号，默认8080
    // hot: true, // 默认已开启
    // host: "0.0.0.0", // 允许外部访问
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    historyApiFallback: true, // 解决history路由404问题
  },
  resolve: {
    //可以加快webpack解析速度
    extensions: [".vue", ".ts", ".scss", "..."],
    alias: {
      "@": resolve("./src"),
      "@/assets": resolve("./src/assets"),
      "@/style": resolve("./src/style"),
    },
  },
  plugins: [
    // 解析.vue文件必需插件
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack5+Vue3+ts",
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      // 最初加载的输出css文件名
      filename: "style/[name]_[contenthash:8].css",
      // 按需加载的 chunk 文件名
      chunkFilename: "style/[id].css",
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      BASE_URL: "'./'",
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
          // 生产环境单独打包
          MiniCssExtractPlugin.loader,
          // "style-loader",
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
          filename: "image/[name]_[contenthash:10][ext]",
        },
      },
    ],
  },
};

export default config;
