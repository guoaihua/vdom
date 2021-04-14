/*
 * @Author: ziming
 * @Date: 2021-04-07 23:09:40
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-11 17:43:13
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/mustache/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './template/index.html'),
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        openPage: 'index.html'
    },
    devtool: 'source-map'
}