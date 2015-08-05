var gulp = require('gulp');
var browserSync = require('browser-sync');
var vulcanize = require('gulp-vulcanize');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: './app'
        }
    });

    gulp.watch(['./app/**/*.html']).on('change', browserSync.reload);
});

gulp.task('clean', function (cb) {
    del('./dist/**/*', cb);
});

gulp.task('copy', function () {
    return gulp.src(['./app/bower_components/**/*', './app/components/**/*', '!./app/components/**/*.html'], { base: './app' })
        .pipe(gulp.dest('./dist'));
});

gulp.task('vulcanize', function () {
    return gulp.src('./app/index.html')
        .pipe(vulcanize())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function (cb) {
    runSequence('clean',
        ['copy', 'vulcanize'],
        cb
    );
});

gulp.task('default', ['server']);
