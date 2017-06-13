/**
 * Created by wangweilin on 2017/6/13.
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './index.js'
    },
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
        library: 'ajax',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    watch: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    babelrc: true
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            comments: false,
            beautify: false
        }),
        new webpack.BannerPlugin('author:wwl')
    ]
};