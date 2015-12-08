'use strict';

var webpack = require('webpack');
var baseResolve = require('./webpack.config.client-hot').resolve;


var baseConfiguration = {
        browsers: ['PhantomJS'],
        client: {
            mocha: {
                ui: 'bdd',
                // To avoid TIMEOUT errors in Windows.
                timeout: 15000
            }
        },
        // Enable color output
        colors: true,

        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'build/reports/coverage'
            }],
            check: {
                global: {
                    statements: 50,
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    excludes: []
                },
                each: {
                    statements: 50,
                    branches: 50,
                    functions: 50,
                    lines: 50,
                    excludes: [
                    ],
                    overrides: {}
                }
            },
            watermarks: {
                statements: [50, 90],
                functions: [50, 85],
                branches: [50, 60],
                lines: [50, 90]
            }
        },

        files: [
            // all files ending in "_test"
            './src/global/client/**/tests/**/*.es6'
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            './src/global/client/**/tests/**/*.es6': ['webpack']
        },

        frameworks: ['mocha', 'chai-sinon'],

        singleRun: true,

        reporters: ['dots', 'coverage'],

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
            noInfo: true
        },

        plugins: [
            require('karma-chrome-launcher'),
            require('karma-coverage'),
            require('karma-mocha'),
            require('karma-notify-reporter'),
            require('karma-phantomjs-launcher'),
            require('karma-chai-sinon'),
            require('karma-webpack')
        ],

        browserDisconnectTimeout: 10000,    // Default 2000
        browserDisconnectTolerance: 1,      // Default 0
        browserNoActivityTimeout: 60000     // Default 10000
};

module.exports = function (config) {
    config.set(baseConfiguration);
};

module.exports.baseConfiguration = baseConfiguration;