const path = require('path');

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
    }
}