const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.config.js');

const devConfig = {
    devtool: 'cheap-module-source-map',
    watch: true,
    entry: [
        `webpack-dev-server/client?http://${process.env.npm_package_config_host}:${process.env.npm_package_config_port}`,
        path.join(config.basePath, config.testEntryJs) 
    ],
    output: {
        path: config.absoluteBuildPath,
        filename: `${config.bundleName}.js`
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': true,
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    module: config.module,
    resolve: config.resolveEntry
};

if (config.dllModules.length > 0) {
    devConfig.plugins.push(
        new webpack.DllReferencePlugin({
            context: config.absoluteDllPath,
            manifest: require(path.join(config.absoluteDllPath, `${config.dllBundleName}.json`))
        })
    );
    devConfig.plugins.push(
        new HtmlWebpackPlugin({
            template: config.htmlDevTemplate, 
            inject: 'body' 
        })
    ); 
} else {
     devConfig.plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(config.absoluteDevToolsPath, config.htmlTemplate),
            inject: 'body' 
        })
    );   
}

module.exports = devConfig;