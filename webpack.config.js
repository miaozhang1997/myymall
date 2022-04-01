// 引入path模块
const path = require("path");

// 引入html - webpack - plugin模块
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 获取绝对路径
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  // 指定为开发者模式
  mode: "development",

  // 指定要打包的入口文件
  entry: {
    index: "/src/pages/index/index.js",
  },
  // 指定打包之后文件的路径和文件名
  output: {
    path: resolve("dist"),
    filename: "js/[name].js",
  },

  // 用于调试:出错时可直接定位到原始代码,而不是转换后的代码
  devtool: "cheap-module-eval-source-map",

  // 解析
  resolve: {
    // 自动补全(可省略的)扩展名
    extensions: [".js"],

    // 创建 import 或 require 的别名
    // alias: {
    //   api: resolve("src/api"),
    //   fonts: resolve("src/assets/fonts"),
    //   images: resolve("src/assets/images"),
    //   styles: resolve("src/assets/styles"),
    //   components: resolve("src/ components"),
    //   pages: resolve("src/pages"),
    // },
  },

  // 设置如何处理不同类型的模块
  module: {
    rules: [
      //css
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      //html
      // {
      //   test: /\.html$/,
      //   exclude: [/node_modules/, require.resolve("./index.html")],
      //   use: {
      //     loader: "file-loader",
      //   },
      // },
      //模板
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
      //图片
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "images/[name].[ext]",
            // 单位：B
            // 若图片小于10k，转为base64格式
            // 若图片大于10k，用file-loader处理
            limit: 10000,
            esModule: false,
          },
        },
      },
      //字体
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "fonts/[name].[ext]",
            limit: 10000,
          },
        },
      },
    ],
  },

  // 自定义 webpack 构建过程
  plugins: [
    //  将依赖自动注入HTML模板,并输出最终的HTML文件到目标文件夹
    new HtmlWebpackPlugin({
      // 输出的文件名
      filename: "index.html",
      // 模板
      template: "src/pages/index/index.art",
      // chunks: ["index"],
    }),
    // new HtmlWebpackPlugin({
    //   filename: "list.html",
    //   template: "./src/list.art",
    //   chunks: ["list"],
    // }),
  ],
};
// 开发阶段无dist文件夹
// path.resolve() 方法将路径或路径片段的序列解析为绝对路径
