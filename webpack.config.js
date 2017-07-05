const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const config = {
        output: {
            filename: '[name]-[hash].js',
            path: path.join(__dirname, 'dist'),
            publicPath: '/'
        },
        context: path.join(__dirname, 'client'),
        devtool: 'inline-source-map',
        module: {
            rules: [{
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            }]
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({template: 'index.html'})
        ]
    };

    if (env !== 'production') {
        config.entry = [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './index.js'
        ];
        config.devServer = {
            hot: true,
            contentBase: path.join(__dirname, 'dist'),
            publicPath: '/',
            historyApiFallback: {index: '/'},
            proxy: {
                "/api": "http://localhost:3000"
            }
        };
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
    } else {
        config.entry = [
            './index.js'
        ];
    }

    return config;
};
