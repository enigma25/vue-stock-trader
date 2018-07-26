var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const filePath = path.join(__dirname, "/dist");

module.exports = {
  entry: "./src/main.js",
  mode: process.env.NODE_ENV,
  output: {
    path: filePath,
    filename: "build.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./index.html",
      filename: "./index.html"
    })
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.common.js"
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: filePath,
    publicPath: "/"
  },
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map"
};
