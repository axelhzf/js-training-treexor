module.exports = {
  entry: "./src/main.js",
  output: {
    path: "assets",
    filename: "bundle.js",
    publicPath: "assets"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {presets: ["es2015"]}
      }
    ]
  }
};