var Gulp = require('gulp');
var Path = require('path');
var Merge = require('merge-stream');


Gulp.task('media', function () {

    // Copy all client-side media to static folder
    var general = Gulp.src('./src/global/client/media/**/*')
        .pipe(Gulp.dest(Path.join('./static', 'media')));

    // Copy Font Awesome
    var fonts = Gulp.src('./node_modules/font-awesome/fonts/**')
        .pipe(Gulp.dest(Path.join('./static', 'media', 'font-awesome', 'fonts')));

    return Merge(general, fonts);
});
