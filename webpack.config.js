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
        rules: [
            {test:/\.txt$/, use: "row-loader", exclude: /node_modules/},
            {
                test:/\.css$/, 
                use:[
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                          modules: true
                        },
                        options: {
                            importLoaders: 1,
                            modules: true,
                          },
                    }
                ],
                include: /\.module\.css$/,
                exclude: /node_modules/
            },
            {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
      exclude: /\.module\.css$/,
    },
        ]
    },
    plugins: [new HTMLWebpackPlugin({template: "./index.html"})]    
    
}