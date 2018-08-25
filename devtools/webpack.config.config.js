const path = require('path')

const libraryName = 'simpler-redux'

// Entry point for your library. This is assumed to be in the src directory at the root level.
const libEntryJs = 'index.js'

// Entry point for your minimized build. This is assumed to be in the src directory at the root level.
const buildEntryJs = 'index.js'

// List of modules you require for your library and do not want them contained in your own
// library module. For example, you would not want react code contained in your library so that
// would be in the list below. But you may want an Object.assign polyfill in your library. So,
// do not list object-assign and that will be included in your library.
// The key item is the library name and the second is how you will refer to it in
// your code.
const externalsLibMin = {
  'redux': 'Redux',
  'react': 'React'
}

const externalsLibLib = {
  'redux': 'redux',
  'react': 'react',
  'react-redux': 'react-redux',
  'prop-types': 'prop-types'
}

/*
  This is a list of modules used to create a dll library.
 Important for faster compiling since these rarely change.
 Note: If you add or subtract from this list or update any modules in the list, pull up the task list
 and select "Builddll Development". Otherwise, run the command npm run builddll:dev.
*/
const dllModules = [
  'redux',
  'react',
  'react-dom',
  'react-redux',
  'object-assign'
]

const config = {
  sourceDir: 'src', // Source directory.
  buildDir: 'dist', // Build directory
  libDir: 'lib', // Library build directory
  libEntryJs,
  buildEntryJs,
  libraryName: libraryName,
  bundleName: 'bundle', // For development debug only.
  testEntryJs: 'test.dev/index.dev.js', // For development debug only.
  htmlTemplate: 'index.ejs', // For development debug only.

  // List of modules you require for your library and do not want them contained in your own
  // library module. For example, you would not want react code contained in your library so that
  // would be in the list below. But you may want an Object.assign polyfill in your library.
  // The key item is the library name and the second is how you will refer to it in
  // your code.
  externalsLibMin,
  externalsLibLib,

  dllDir: 'devdll', // Build directory for the the development dll library.
  dllBundleName: 'dllbundle',
  dllModules,
  htmlDevTemplate: 'index.dev.ejs', // Used for the development html template. This is built.

  libraryTarget: 'commonjs2',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  node_modulesPath: 'node_modules',
  resolveExtensions: ['.js', '.jsx']
}

config.basePath = process.cwd()

// At this time, the source directory must be directly below the vscode directory.
config.absoluteSourcePath = path.join(config.basePath, config.sourceDir)

// At this time, the build directory must be directly below the vscode directory.
config.absoluteBuildPath = path.join(config.basePath, config.buildDir)

// At this time, the lib directory must be directly below the vscode directory.
config.absoluteLibPath = path.join(config.basePath, config.libDir)

// At this time, the dll directory must be directly below the vscode directory.
config.absoluteDllPath = path.join(config.basePath, config.dllDir)

config.absoluteDevToolsPath = path.join(config.basePath, 'devtools')

config.resolveEntry = {
  modules: [
    config.absoluteSourcePath,
    config.node_modulesPath
  ],
  extensions: config.resolveExtensions
}

module.exports = config
