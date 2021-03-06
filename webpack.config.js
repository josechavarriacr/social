var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/scripts.js",
  output: {
    path: __dirname + "/src/dist",
    filename: "scripts.min.js"
  },
  module: {
    rules: [{
      test: /\.(handlebars|hd?bs)$/,
      loader: 'handlebars-loader',
      query: {
        extensions: ['handlebars', 'hdbs', 'hbs'],
        runtime: 'handlebars',
        rootRelative: './src/partials/'
      }
    }, {
      test: /\.sass$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }],
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
  ],
};
