/*
 * @Author: ziming
 * @Date: 2021-04-07 23:09:40
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-07 23:29:17
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './dist')
    }
}