const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.config.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    dllModules: config.dllModules
  },

  output: {
    filename: `${config.dllBundleName}.js`,
    path: config.absoluteDllPath,
    library: config.dllBundleName
  },

  plugins: [
    new webpack.DllPlugin({
      context: config.absoluteDllPath,
      name: config.dllBundleName,
      path: path.join(config.absoluteDllPath, `${config.dllBundleName}.json`)
    }),
    new HtmlWebpackPlugin({
      template: path.join(config.absoluteDevToolsPath, config.htmlTemplate),
      filename: path.join(config.basePath, config.htmlDevTemplate),
      inject: 'body',
      hash: true
    })
  ],
  resolve: config.resolveEntry
}
