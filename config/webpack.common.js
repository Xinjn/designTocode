const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackBar = require("webpackbar");

module.exports = {
  entry: {
    index: path.join(__dirname, "../src/index.js"),
  },
  output: {
    filename: "[name].[chunkhash:4].js",
    path: path.join(__dirname, "../dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/tempate.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new WebpackBar(),
  ],
  stats: {
    modules: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 不在生成license
      }),
    ],
  },
  // externals: {
  //   react: "React",
  //   "react-dom": "ReactDOM",
  // },
  resolve: {
    //文件扩展名需要添加ts
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        loader: "babel-loader",
      },
      {
        test: /\.(css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },

          "less-loader",
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(bmp|gif|png|jpe?g)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              name: "[name].[contenthash:8].[ext]",
              outputPath: "assets/images",
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[contenthash:8].[ext]",
              outputPath: "assets/fonts",
            },
          },
        ],
      },
    ],
  },
};
