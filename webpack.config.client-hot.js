var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var util = require('util');
var webpack = require('webpack');

var buildDir = path.resolve(pkg.config.buildDir);

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var cssBundle = path.join('css', util.format('app.%s.css', pkg.version));
var jsBundle = path.join('js', util.format('app.%s.js', pkg.version));
var jsMapBundle = path.join('js', 'index.js.map');

var jsxLoader;
var sassLoader;
var cssLoader;
var fileLoader = 'file-loader?name=[path][name].[ext]';
var htmlLoader = [
    'file-loader?name=[path][name].[ext]',
    'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'version=' + pkg.version,
        'title=' + pkg.name,
        'debug=' + DEBUG
    ].join('&')
].join('!');
var jsonLoader = ['json-loader'];

var sassParams = [
    'outputStyle=expanded',
    'includePaths[]=' + path.resolve(__dirname, './src/global/client/scss'),
    'includePaths[]=' + path.resolve(__dirname, './node_modules')
];

jsxLoader = [];
jsxLoader.push('react-hot');
jsxLoader.push('babel-loader');
sassParams.push('sourceMap', 'sourceMapContents=true');
sassLoader = [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
].join('!');
cssLoader = [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'csslint'
].join('!');


module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        /*path.resolve(__dirname, './app/views/Index'),*/
        path.resolve(__dirname, './src/global/client/index')
    ],
    output: {
        path: buildDir,
        filename: jsBundle,
        sourceMapFilename: jsMapBundle,
        publicPath: "http://localhost:8080/",
        devtoolModuleFilenameTemplate: "../[resource-path]",
        devtoolFallbackModuleFilenameTemplate:"../[resource-path]"
    },
    plugins: [
        new ExtractTextPlugin(cssBundle, {
            allChunks: true,
            publicPath: 'http://localhost:8080/'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({
          filename: jsMapBundle
        }),
        new ForkCheckerPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.ts', '.tsx'],
        root: ['${__dirname}/src/global/client/'],
        fallback: path.join(__dirname, "node_modules")
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: htmlLoader
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: sassLoader
        }, {
            test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$|\.eot$/,
            loader: fileLoader
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loaders: jsonLoader
        }, {
            test: /\.(jsx|es6)$/,
            loaders: jsxLoader,
            exclude: /node_modules/
        }, {
            include: /\.js$/,
            loaders: ["babel"],
            exclude: /node_modules/
        }, {
            test: /\.ts(x?)$/,
            loader: 'react-hot!awesome-typescript-loader!tslint',
            exclude: /node_modules/
        }]
    },
    tslint: {
        configuration: {
            
        },

        // tslint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // tslint does not interrupt the compilation by default
        // if you want any file with tslint errors to fail
        // set failOnHint to true
        failOnHint: true,


        //rulesDirectory: 'node_modules/tslint-eslint-rules/dist/rules',

        // name of your formatter (optional)
        //formatter: "yourformatter",

        // path to directory containing formatter (optional)
        formattersDirectory: "node_modules/tslint-loader/formatters/"
    }
};
