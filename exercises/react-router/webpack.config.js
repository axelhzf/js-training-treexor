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
        query: {presets: ["es2015", "stage-0", "react"]}
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};