var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            './src/entry.js'
        ]
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/assets/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                 use: {
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: 'css-loader'
                            }),
                            stylus: ExtractTextPlugin.extract({
                                use: ["css-loader", "postcss-loader","less-loader"]
                            })
                        }
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "postcss-loader","less-loader"]
                })
            },
             {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader"]
                })
            },
            {
                test: /\.js$/,
                use: "babel-loader",
                include: [path.resolve(__dirname, 'src')]
            },
             {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({
            warnings: false
        }), new ExtractTextPlugin({
            filename: "build.css"
        }), new HtmlWebpackPlugin({
            filename: 'index.html'
        }), new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    devtool: 'eval'
}