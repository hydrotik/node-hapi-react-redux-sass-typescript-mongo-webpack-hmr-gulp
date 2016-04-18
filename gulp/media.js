var Gulp = require('gulp');
var Path = require('path');
var Merge = require('merge-stream');
var Config = require('../config.js');

Gulp.task('media', function () {

    // Copy all client-side media to static folder
    var general = Gulp.src('./src/global/client/media/**/*')
        .pipe(Gulp.dest(Path.join(Config.get('/buildDir'), 'media')));
        
    var general = Gulp.src('./src/global/client/assets/**/*')
        .pipe(Gulp.dest(Path.join(Config.get('/buildDir'), 'assets')));
        
    // Copy Font Awesome
    var fonts = Gulp.src('./node_modules/font-awesome/fonts/**')
        .pipe(Gulp.dest(Path.join(Config.get('/buildDir'), 'media', 'font-awesome', 'fonts')));

    return Merge(general, fonts);
});
