import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import { DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration, WebpackConfigEnv } from "webpack.type";

const resolve = (dir: string) => path.resolve(__dirname, dir);

export default function baseConfig(env: WebpackConfigEnv): Configuration {
  return {
    entry: "./src/index.ts",
    resolve: {
      //可以加快webpack解析速度
      extensions: [".vue", ".ts", ".scss", "..."],
      alias: {
        "@": resolve("./src"),
        "@/assets": resolve("./src/assets"),
        "@/style": resolve("./src/style")
      }
      // 优先查找src，再查找node_modules
      // modules: [resolve("src"), "node_modules"]
    },
    plugins: [
      // 解析.vue文件必需插件
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: "webpack5+Vue3+ts",
        template: "./public/index.html"
      }),
      new DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      })
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: resolve("src"),
          loader: "vue-loader"
        },
        {
          test: /\.s?css$/,
          use: [
            // 生产环境单独打包，开发环境用style-loader
            env.production ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          type: "asset",
          parser: {
            // 图片小于20kb，会被解析为一个 Base64 编码的字符串注入到包中，
            dataUrlCondition: {
              maxSize: 20 * 1024
            }
          },
          generator: {
            // 此选项被称为文件名，但还是可以使用像 'js/[name]/bundle.js' 这样的文件夹结构
            filename: "image/[name]_[contenthash:10][ext]"
          }
        }
      ]
    }
  };
}
