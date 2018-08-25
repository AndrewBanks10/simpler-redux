const path = require('path')
const config = require('./webpack.config.config')

module.exports = {
  entry: path.join(config.absoluteSourcePath, config.buildEntryJs),
  output: {
    path: config.absoluteBuildPath,
    filename: `${config.libraryName}.js`
  },
  externals: config.externalsLibMin,
  module: config.module
}
