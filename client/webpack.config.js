const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/main.ts",
        vendor: "./src/vendor.ts"
    },
    output: {
        path: path.join(__dirname + '/dist/'),
        filename: '[name].bundle.js'
    },
    module: {
       loaders: [
           { test: /\.ts$/, loader: 'ts-loader'}
       ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}
