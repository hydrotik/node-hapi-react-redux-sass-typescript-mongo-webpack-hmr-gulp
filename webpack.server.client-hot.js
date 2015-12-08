var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var commandLineArgs = require("command-line-args");

console.info("==> ✅  Webpack is starting");

var config = require('./webpack.config.client-hot');



new WebpackDevServer(webpack(config), {
    contentBase: path.resolve(__dirname, './'),
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    stats: {
        colors: true,
        chunks: false
    }
}).listen(8080, 'localhost', function (err, stats) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
  }

  console.info("==> ✅  Webpack is listening on 8080");
});

// Add opn in here or communicate with Nodemon