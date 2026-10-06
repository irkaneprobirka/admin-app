import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

function remote(name, port) {
  return 'promise new Promise((resolve, reject) => {' +
    'const config = window.APPS_CONFIG || {};' +
    'const base = config[' + JSON.stringify(name + 'Url') + '] || window.location.protocol + "//" + window.location.hostname + ":' + port + '";' +
    'const script = document.createElement("script");' +
    'script.src = new URL("remoteEntry.js", base.endsWith("/") ? base : base + "/").href;' +
    'const timeout = setTimeout(() => { script.remove(); reject(new Error("Timeout: " + script.src)); }, 15000);' +
    'script.onload = () => { clearTimeout(timeout); const container = window[' + JSON.stringify(name) + ']; if (!container) { reject(new Error("Missing container")); return; } resolve({ get: container.get.bind(container), init: container.init.bind(container) }); };' +
    'script.onerror = () => { clearTimeout(timeout); script.remove(); reject(new Error("Cannot load " + script.src)); };' +
    'document.head.appendChild(script);' +
  '})';
}

export default {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js", publicPath: "auto", uniqueName: "admin"
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
    new webpack.container.ModuleFederationPlugin({
      name: "admin",
      remotes: { app1: remote("app1", 3000), app2: remote("app2", 3002) },
      shared: { react: { singleton: true, requiredVersion: "^18.2.0" }, "react-dom": { singleton: true, requiredVersion: "^18.2.0" } },
    }),
    { apply(compiler) { compiler.hooks.thisCompilation.tap("AppsConfig", compilation => { compilation.hooks.processAssets.tap({ name: "AppsConfig", stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL }, () => { compilation.emitAsset("apps-config.js", new webpack.sources.RawSource(compiler.inputFileSystem.readFileSync(path.resolve("public/apps-config.js")))); }); }); } },
    new HtmlWebpackPlugin({ template: "public/index.html" })
  ],
  devServer: {
    host: "0.0.0.0", allowedHosts: "all",
    port: 3001,
    hot: true
  }
};
