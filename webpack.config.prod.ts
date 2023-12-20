import { Configuration, WebpackConfigEnv } from "webpack.type";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.config.base";

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
  // optimization: {
  //   runtimeChunk: "single"
  // }
};

export default (env: WebpackConfigEnv) => {
  return merge<Configuration>(baseConfig(env), prodConfig);
};
