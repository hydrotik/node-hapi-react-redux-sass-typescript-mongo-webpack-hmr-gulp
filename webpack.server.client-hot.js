var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var commandLineArgs = require("command-line-args");

console.info("==> ✅  Webpack is starting");

var webpackConfig = require('./webpack.config.client-hot');
var Config = require('./config');


new WebpackDevServer(webpack(webpackConfig), {
    contentBase: path.resolve(__dirname, './'),
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: {
        colors: true,
        chunks: false
    },
    proxy: {
        "*" : {
            target: "http://" + Config.get('/devHost') + ':' + Config.get('/devPort'),
            secure: false,
            bypass: function(req, res, proxyOptions) {

            }
        }
    }
}).listen(Config.get('/webpackPort'), Config.get('/devHost'), function (err, stats) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
  }

  console.info("==> ✅  Webpack is listening on " + Config.get('/devHost') + ':' + Config.get('/webpackPort'));
});

// Add opn in here or communicate with Nodemon