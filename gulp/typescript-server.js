var Gulp = require('gulp');
var ts = require('gulp-typescript');

var dir = 'src/global/server/**/*.tsx';

var tsProject = ts.createProject('tsconfig.json');

Gulp.task('typescript', function() {
    return Gulp.src(dir)
        .pipe(ts(tsProject))
        .pipe(Gulp.dest('build'));
});
Gulp.task('watch', ['typescript'], function() {
    gulp.watch(dir, ['typescript']);
});