const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  watchOptions: {
    aggregateTimeout: 600,
  },
  entry: {
    home: ["./src/scss/home.scss", "./src/js/home.js"],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin([
      {
        from: "./src/images",
        to: path.resolve(__dirname, "dist/images"),
      },
    ]),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: "./templates/layout.jinja2",
    //   filename: "index.html",
    // }),
    new CopyPlugin([
      {
        from: "./node_modules/@fortawesome/fontawesome-free/webfonts",
        to: path.resolve(__dirname, "dist/webfonts"),
      },
    ]),
    // new CopyPlugin([
    //   {
    //     from: "./static/src/images",
    //     to: path.resolve(__dirname, "static/dist/images"),
    //   },
    // ]),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          // {
          //   loader: "file-loader",
          //   options: {
          //     name: "/js/[name].js",
          //   },
          // },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
            outputPath: "assets/fonts/",
            publicPath: "assets/fonts/",
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/css/[name].css",
            },
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "css-loader?-url",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
};
