'use strict';

var webpack = require('webpack');
var baseResolve = require('./webpack.config.client-hot').resolve;



module.exports = function(config) {
    config.set({
        // ... normal karma configuration

        files: [
            // all files ending in "_test"
            './src/global/client/**/tests/**/*.es6'
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            './src/global/client/**/tests/**/*.es6': ['webpack']
        },

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            devtool: '#inline-source-map',
            module: {
                loaders: [{
                    test: /\.html$/,
                    loader: 'html'
                }, {
                    test: /\.json$/,
                    loader: 'json'
                }, {
                    test: /\.(jsx|es6)$/,
                    loader: 'babel',
                    exclude: /node_modules/
                }, {
                    test: /\.ts(x?)$/,
                    loader: 'react-hot!awesome-typescript-loader!tslint',
                    exclude: /node_modules/
                }],
                postLoaders: [{
                    test: /\.(jsx|es6)$/,
                    exclude: /(__tests__|node_modules)/,
                    loader: 'isparta'
                }]
            },
            plugins: [
                new webpack.NormalModuleReplacementPlugin(/\.(sass|scss)$/, 'node-noop'),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                    }
                })
            ]
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: false
        },

        plugins: [
            require("karma-webpack")
        ]

    });
};