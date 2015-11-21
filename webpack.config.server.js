var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pkg = require('./package.json');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var util = require('util');
var webpack = require('webpack');


var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

var cssBundle = path.join('css', util.format('app.%s.css', pkg.version));
var jsBundle = path.join('js', util.format('app.%s.js', pkg.version));

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
jsxLoader.push('babel-loader?presets[]=es2015&cacheDirectory=true');
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
    devtool: 'source-map',
    devServer: {
        // proxy calls to api to our own node server backend
        proxy: {
            '/app/*': 'http://localhost:8000/'
        }
    },
    context: path.join(__dirname, './src/global/client'),
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        /*path.resolve(__dirname, './app/views/Index'),*/
        path.resolve(__dirname, './src/global/client/index')
    ],
    /*
        output: {
            path: path.resolve(__dirname, 'hot'),
            filename: 'bundle.js'
        },*/
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    output: {
        path: path.resolve(pkg.config.buildDir),
        filename: jsBundle,
        publicPath: "http://localhost:8080/"
    },
    plugins: [
        new ExtractTextPlugin(cssBundle, {
            allChunks: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.ts', '.tsx'],
        root: ['${__dirname}/src/global/client/']
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
            loaders: ["babel-loader?stage=0&optional=runtime&plugins=typecheck"],
            exclude: /node_modules/
        }, {
            test: /\.ts(x?)$/,
            loader: 'react-hot!babel-loader!webpack-typescript?target=ES5&jsx=preserve',
            exclude: /node_modules/
        }]
    }
};
