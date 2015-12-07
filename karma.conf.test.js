var baseConfiguration = {
    // Base path that will be used to resolve all patterns (e.g. files)
    basePath: '',
    // Start these browsers
    // Available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Safari'], //['PhantomJS']
    client: {
        mocha: {
            ui: 'bdd',
            // To avoid TIMEOUT errors in Windows.
            timeout: 15000
        }
    },
    // Enable color output
    colors: true,
    // List of files / patterns to load in the browser.
    // Sources do not need to be explicitly loaded as this are handled by
    // the Webpack transpilation step.
    files: [
        { pattern: './src/global/client/**/tests/**/*.es6', watched: false, included: true, served: true }
    ],
    // Frameworks to use
    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-sinon'],
    // DO NOT REMOVE PLUGINS
    // Some systems are not smart enough to load the plugins directly from
    // the node modules directory.
    plugins: [
        require('karma-chrome-launcher'),
        require('karma-coverage'),
        require('karma-mocha'),
        require('karma-notify-reporter'),
        require('karma-phantomjs-launcher'),
        require('karma-chai-sinon'),
        require('karma-webpack')
    ],
    // Web server port
    port: 9876,
    // Preprocess matching files before serving them to the browser
    // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/global/client/**/tests/**/*.js': ['webpack'],
        'src/global/client/**/tests/**/*.es6': ['webpack']
    },
    // Test results reporter to use
    // Possible values: 'dots', 'progress'
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'coverage'],
    singleRun: true,
    webpack: {
        bail: true,
        devtool: '#inline-source-map',
        module: {
            loaders: [{
                test: /\.hbs$/,
                exclude: /node_modules/,
                loader: 'handlebars-loader'
            }, {
                test: /\.html$/,
                loader: 'html'
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(jsx|es6)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    optional: ['runtime']
                }
            }, {
                test: /\.ts(x?)$/,
                loader: 'react-hot!awesome-typescript-loader!tslint',
                exclude: /node_modules/,
                query: {
                    optional: ['runtime']
                }
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
        ],
        resolve: baseResolve
    },
    webpackMiddleware: {
        noInfo: false
    },
    // To avoid DISCONNECTED messages
    // https://github.com/karma-runner/karma/issues/598
    browserDisconnectTimeout: 10000,    // Default 2000
    browserDisconnectTolerance: 1,      // Default 0
    browserNoActivityTimeout: 60000     // Default 10000
};

module.exports = function (config) {
    config.set(baseConfiguration);
};

module.exports.baseConfiguration = baseConfiguration;