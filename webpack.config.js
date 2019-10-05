const path = require('path');

module.exports = {
    entry: './client/app.js',
    output: {
        filename: './app.js',
        path: path.join(__dirname, 'assets')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}