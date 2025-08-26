import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "esbuild-loader",
        options: { loader: "jsx", target: "es2015" }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html" })
  ],
  devServer: {
    port: 3001,
    hot: true
  }
};
