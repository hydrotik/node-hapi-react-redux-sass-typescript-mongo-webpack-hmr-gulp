var Gulp = require('gulp');


Gulp.task('watch', ['sass'], function () {

    global.isWatching = true;
    Gulp.watch('./src/global/client/**/*.scss', ['sass']);
    Gulp.watch('./src/global/server/**/*.scss', ['sass']);
});
