const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/App.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/')
        }
    },
    devtool: "inline-source-map",
    module: {
        rules: [{
            test:/\.txt$/, 
            use: "row-loader", 
            exclude: /node_modules/
        }]
    },
    plugins: [new HTMLWebpackPlugin({template: "./index.html"})]
}