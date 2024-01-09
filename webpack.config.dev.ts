import { Configuration, WebpackConfigEnv } from "webpack.type";
import baseConfig from "./webpack.config.base";
import { merge } from "webpack-merge";

const devConfig: Configuration = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
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
  return merge<Configuration>(baseConfig(env), devConfig);
};
