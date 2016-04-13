var Gulp = require('gulp');
var Gutil = require('gulp-util');
var Webpack = require('webpack');
var path = require('path');

var config = require('../webpack.config.client-hot.js');

var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var executionCount = 0;


Gulp.task('webpack', function(callback) {

    Webpack(config, function(err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({
            colors: true,
            chunkModules: false
        }));

        if (executionCount === 0) {
            callback();
        }
        executionCount += 1;
    });
});