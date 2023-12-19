import path from "path";
import { DefinePlugin } from "webpack";
import { merge } from "webpack-merge";
import { VueLoaderPlugin } from "vue-loader";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Configuration = WebpackConfiguration & {
  devServe?: DevServerConfiguration;
};

type WebpackConfigEnv = {
  [key: string]: boolean | number | string;
  production: boolean;
  development: boolean;
};

const resolve = (dir: string) => path.resolve(__dirname, dir);

const baseConfig = (env: WebpackConfigEnv): Configuration => {
  return {
    entry: {
      index: {
        import: "./src/index.ts",
        dependOn: "shared"
      },
      home: {
        import: "./src/home.ts",
        dependOn: "shared"
      },
      shared: ["lodash"]
    },
    output: {
      filename: "[name].[contenthash:8].js",
      clean: true,
      environment: {
        //生产打包输出普通函数IIFE
        arrowFunction: false
      }
    },
    resolve: {
      //可以加快webpack解析速度
      extensions: [".vue", ".ts", ".scss", "..."],
      alias: {
        "@": resolve("./src"),
        "@/assets": resolve("./src/assets"),
        "@/style": resolve("./src/style")
      }
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
};

const prodConfig: Configuration = {
  mode: "production",
  module: {
    rules: [
      // 在package.json中配置脚本，在打包前用tsc校验，打包用babel可以按需引入polyfill
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 最初加载的输出css文件名，开发环境不要用hash/fullhash/contenthash/chunkhash/modulehash
      filename: "style/[name]_[contenthash:8].css",
      // 按需加载的 chunk 文件名
      chunkFilename: "style/[name]_[chunkhash:8].css"
    }),
    new CopyPlugin({
      patterns: [
        {
          // form：复制的文件或者目录
          from: "./public",
          // globOptions.ignore：不复制html，已经使用了插件HtmlWebpackPlugin，否则报重复错误
          globOptions: { ignore: ["**/index.html"] }
          // 默认就是配置的output输出目录，output.path没有配置，默认就是dist
          // to: "",
        }
      ]
    })
  ]
};

const devConfig: Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    // port: 999, // 服务端口号，默认8080
    // hot: true, // 默认已开启
    // host: "0.0.0.0", // 允许外部访问
    historyApiFallback: true // 解决history路由404问题
  },
  module: {
    rules: [
      {
        // 开发时用 tsc校验，编译时会进行语法检查
        test: /\.ts$/,
        //排除 node_modules 目录
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // 从vue文件分离出来的ts内容会加上ts后缀给ts-loader处理
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      }
    ]
  }
};

export default (env: WebpackConfigEnv) => {
  return merge<Configuration>(
    baseConfig(env),
    env.production ? prodConfig : devConfig
  );
};
