import { Configuration, WebpackConfigEnv } from "webpack.type";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.config.base";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import { globSync } from "glob";
import path from "path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

// import SpeedMeasurePlugin from "speed-measure-webpack-plugin"; // 不兼容新版插件
// const smp = new SpeedMeasurePlugin();

const resolve = (dir: string) => path.resolve(__dirname, dir);

const prodConfig: Configuration = {
  mode: "production",
  output: {
    filename: "[name].[contenthash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    clean: true,
    environment: {
      //生产打包输出普通函数IIFE
      arrowFunction: false
    }
  },
  module: {
    rules: [
      // 在package.json中配置脚本，在打包前用tsc校验，打包用babel可以按需引入polyfill
      {
        test: /\.ts$/,
        include: resolve("./src"),
        use: ["thread-loader", "babel-loader"]
        // use: ["babel-loader"]
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
    }),
    new PurgeCSSPlugin({
      paths: globSync(`${path.resolve(__dirname, "src")}/**/*`, {
        nodir: true
      })
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "all",
          priority: 20,
          test: /[\\/]node_modules[\\/]/
        },
        common: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          reuseExistingChunk: true,
          chunks: "initial",
          name: "common_node_modules",
          minSize: 0
        }
      }
    }
  }
};

export default (env: WebpackConfigEnv) => {
  // return smp.wrap(merge<Configuration>(baseConfig(env), prodConfig));
  return merge<Configuration>(baseConfig(env), prodConfig);
};
