module.exports = {
  entry: {
    index: {
      import: "./src/index.ts",
      dependOn: "shared"
    },
    home: {
      import: "./src/home.ts",
      dependOn: "shared"
    },
    shared: ["lodash-es"]
  },
  output: {
    filename: "[name].[contenthash:8].js"
  },
  optimization: {
    runtimeChunk: "single"
  }
};
