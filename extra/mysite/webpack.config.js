const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var port = process.env.PORT || 8080;
var host = process.env.HOST || "localhost";

module.exports = {
    devtools: "source-map",
    entry:
        {
            "index": [
                'webpack-dev-server/client?http://'+host+':'+port, // WebpackDevServer host and port
                'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
                "./src/client/index.jsx"
            ]
        }
    ,
    output: {
        path: path.resolve("./build"),
        filename: "mysite/[name].js",
        sourceMapFilename: "mysite/[name].js.map",
        publicPath: "/",

    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src/server/index.html',
                to: 'mysite/index.html'
            }
        ]),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['', '.jsx', '.js'],
        alias: {

        }
    },
    module: {
        preLoaders: [],
        loaders: [{
            test: /\.jsx|\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: [/node_modules/]
        }]
    },


}

