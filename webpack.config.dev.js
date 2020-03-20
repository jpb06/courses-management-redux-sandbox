const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
   mode: "development",
   target: "web",
   devtool: 'inline-source-map',
   entry: "./src/index.tsx",
   output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "bundle.js"
   },
   devServer: {
      stats: "minimal",
      overlay: true,
      historyApiFallback: true,
      disableHostCheck: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      https: false
   },
   plugins: [
      new webpack.DefinePlugin({
         "process.env.API_URL": JSON.stringify("http://localhost:3001")
      }),
      new HtmlWebpackPlugin({
         template: "src/index.html",
         favicon: "src/favicon.ico"
      })
   ],
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /(\.css)$/,
            use: ["style-loader", "css-loader"]
         }
      ]
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
   },
};
