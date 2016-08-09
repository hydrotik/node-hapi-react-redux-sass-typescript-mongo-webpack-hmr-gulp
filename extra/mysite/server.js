const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const path = require('path');

var port = process.env.PORT || 8080;
var host = process.env.HOST || "localhost";

var webpackDevServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: path.resolve(__dirname, './build/'),
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: {
        colors: true,
        chunks: false
    },
    proxy: {
        "/mysite/*" : {
            target: "http://" + host + ':' + port,
            secure: false,
            bypass: function(req, res, proxyOptions) {
                return "./build/mysite/index.html"
            }
        }
    }
    
}).listen(port, host, function (err, stats) {
if (err) {
    console.log(err); //eslint-disable-line no-console
}

console.info("==> ✅  Webpack is listening on " + host + ':' + port);
});