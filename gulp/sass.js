var gulp = require('gulp');
var sass = require('gulp-sass');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var path = require('path');
var Config = require('../config.js');

// Compile sass to be served from the static folder by the server
var bundleConfigs = [
    {
        entries: [
            './src/global/server/scss/core.scss'
        ],
        dest: Config.get('/buildDir'),
        outputName: 'core.min.css'
    },
    {
        entries: './src/global/client/scss/app.scss',
        dest: path.join(Config.get('/buildDir'), 'layouts'),
        outputName: 'default.min.css'
    },
    /*
    {
        entries: './client/pages/account/index.less',
        dest: './public/pages',
        outputName: 'account.min.css'
    },
    {
        entries: './client/pages/admin/index.less',
        dest: './public/pages',
        outputName: 'admin.min.css'
    },
    {
        entries: './client/pages/home/index.less',
        dest: './public/pages',
        outputName: 'home.min.css'
    }*/
];

gulp.task('sass', function() {
    return bundleConfigs.map(function(bundleConfig) {
        return gulp.src(bundleConfig.entries)
            .pipe(newer(path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(concat(bundleConfig.outputName))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(bundleConfig.dest));
    });
});