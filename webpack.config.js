const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const banner = `/*! http://wangwl.net */`;
const devMode = env === 'development';

module.exports = {
    mode: devMode ? 'none' : env,
    entry: {
        app: './index.ts'
    },
    output: {
        filename: 'index.js',
        path: __dirname + '/dist',
        library: 'ajax',
        libraryTarget: 'umd',
        umdNamedDefine: false,
        globalObject: 'this',
        libraryExport:'default'
    },
    optimization: {
        minimize: !devMode,
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false,
                        ascii_only: true
                    },
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        properties: true,
                        evaluate: true
                    },
                    warnings: true
                }
            }),
            new webpack.BannerPlugin({banner: banner, raw: true})
        ],

    },
    module: {
        rules: [
            // use: 倒序执行
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader', // 执行顺序 plugins(正序) --> presets(倒序)
                        options: {
                            babelrc: true
                        }
                    },
                    'awesome-typescript-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({ // 会把value直接作为代码块添加在代码中。 例如设置PRODUCTION:"true"，则代码: if(PRODUCTION) 会被转换为 if(true)
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};