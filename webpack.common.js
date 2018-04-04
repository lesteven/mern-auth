var merge = require('webpack-merge');
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        client: './src/client/index.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['react','env','stage-3'],
                        plugins: ['transform-class-properties']
                    }
                }
            },   
            {
                test: /\.(png|svg|jpg|gif)$/, 
                use: [
                    'file-loader',
                ]
            },
        ]
    },
    
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            title: 'Mern Auth',
            template: './public/index.html'
        }) 
    ]

};
 
