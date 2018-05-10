const path = require('path')
const config = require('./webpack.config.config')

module.exports = {
  entry: path.join(config.absoluteSourcePath, config.libEntryJs),
  output: {
    path: config.absoluteLibPath,
    filename: `${config.libraryName}.js`,
    libraryTarget: config.libraryTarget
  },
  externals: config.externalsLibLib,
  module: config.module
}
