const path = require("path");

module.exports = {
  mode: "development", // or "production"
  devtool: "source-map", // Remove if you want to disable source maps
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        exclude: [/stylis-plugin-rtl/], // Exclude problem package
      },
    ],
  },
};