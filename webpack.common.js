const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const manifest = require("./static/manifest.json");

const getScripts = () => {
  const resobj = {};
  const categories = ["content_scripts"];
  for (const category of categories) {
    const scripts = manifest[category]
      .map(({ js: scripts }) =>
        scripts.map((script) => [
          "./" + script.replace(".js", ""),
          "./" + script.replace(".js", ""),
        ])
      )
      .flat();
    Object.assign(resobj, Object.fromEntries(scripts));
  }
  return resobj;
};

module.exports = {
  entry: getScripts(),
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],
};
