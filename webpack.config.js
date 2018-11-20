var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'babel-polyfill':'babel-polyfill',
        'index': './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/react'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader','sass-loader']
            }
        ]
    }
};