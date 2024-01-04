module.exports = {
  //...
  optimization: {
    splitChunks: {
      // 默认只将异步import()引入代码分割，
      chunks: "async",
      // 最小20kb才会分割
      minSize: 20000,
      // 除了满足minsize，还要减少主chunk的大小才会分割
      minRemainingSize: 0,
      // 拆分前必须共享模块的最小chunks数
      minChunks: 1,
      // 按需加载时的最大并行请求数
      maxAsyncRequests: 30,
      // 入口文件的最大并行请求数
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      // 缓存组可以继承和/或覆盖来自 splitChunks.* 的任何选项
      // test、priority 和 reuseExistingChunk 只能在缓存组级别上进行配置。
      // 可以配置多个组，如果一个模块满足多个组条件，最终由priority决定打包到哪个组
      cacheGroups: {
        // 默认将所有来自node_modules目录的模块打包至vendors组
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        // 两个以上的chunk所共享的模块打包至default组
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
