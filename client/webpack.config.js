const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.join(__dirname + '/dist/'),
        filename: 'app.bundle.js'
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
    ]
}
