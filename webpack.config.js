const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'client'),
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    output: {
        filename: '[name]-[hash].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        historyApiFallback: {index: '/'}
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader'
            ],
            exclude: path.join(__dirname, 'node_modules')
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                'sass-loader?sourceMap',
                'postcss-loader'
            ]
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader'
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({template: 'index.html', inject: 'body'})
    ]
};
