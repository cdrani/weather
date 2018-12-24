const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: [path.resolve(__dirname, 'dist')],
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new Dotenv()],
  node: {
    fs: 'empty'
  }
}
