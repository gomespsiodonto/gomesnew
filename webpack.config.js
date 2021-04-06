const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./public/assets/script/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devtool: "eval-source-map",
  resolve: {
    fallback: {
      buffer: require.resolve(__dirname, "buffer/"),
      path: require.resolve(__dirname, "path-browserify"),
      util: require.resolve(__dirname, "util/"),
      stream: require.resolve(__dirname, "stream-browserify"),
      zlib: require.resolve(__dirname, "browserify-zlib"),
      process: require.resolve(__dirname, "process/browser"),
      os: require.resolve(__dirname, "os-browserify/browser"),
      crypto: require.resolve(__dirname, "crypto-browserify"),
      assert: require.resolve(__dirname, "assert/"),
      http: require.resolve(__dirname, "stream-http"),
      https: require.resolve(__dirname, "https-browserify"),
    },
  },
};
