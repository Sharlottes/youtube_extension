//@ts-check

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const manifest = require("./static/manifest.json");

const entry = (() => {
  /** @type {Record<string, string>} */
  const resobj = {};
  /** @type {['content_scripts']} */
  const categories = ["content_scripts"];
  for (const category of categories) {
    for (const { js: scripts = [], css: styles = [] } of manifest[category]) {
      for (const script of scripts) {
        resobj[script.replace(".js", "-js")] = "./" + script.replace(".js", ".ts");
      }
      for (const style of styles) {
        resobj[style.replace(".css", "-css")] = "./" + style.replace(".css", ".scss");
      }
    }
  }

  console.log(resobj);

  return resobj;
})();

/** @type { import("webpack").Configuration} */
module.exports = {
  entry,
  output: {
    filename: (pathdata) => {
      return path.join(String(pathdata.chunk?.id).replace("-js", ".js").replace("-css", ".css"));
    },
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "swc-loader",
      },
      {
        test: /.*\.scss$/,
        use: ["sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".scss"],
  },
};
