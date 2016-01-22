var Gulp = require('gulp');
var ts = require('gulp-typescript');

var root = 'src/global/server';
var dir = '/**/*.tsx';

var tsProject = ts.createProject({
    target : 'ES6',
    jsx : 'preserve',
    experimentalDecorators: true,
    module : 'commonjs',
    emitRequireType: false,
    removeComments : true
  });

// var tsProject = ts.createProject({
//     target : 'ES6',
//     jsx : 'preserve',
//     emitRequireType: false,
//     experimentalDecorators: true,
//     module : 'commonjs',
//     inlineSourceMap: true,
//     inlineSources: false,
//     sourceMap: false
//   });

Gulp.task('typescript', function() {
    return Gulp.src(root + dir)
        .pipe(ts(tsProject))
        .pipe(Gulp.dest(root));
});
Gulp.task('watch', ['typescript'], function() {
    gulp.watch(dir, ['typescript']);
});