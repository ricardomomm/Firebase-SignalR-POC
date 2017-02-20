var gulp = require('gulp');
var config = require('../gulp.config')();
var del = require('del');

/* Run all clean tasks */
gulp.task('clean', ['clean-build', 'clean-ts', 'clean-css']);

/* Clean build folder */
gulp.task('clean-build', function () {
    return del([config.build.path]);
});

/* Clean stylesheets */
gulp.task('clean-css', function () {
    return del([config.assetsPath.styles + '**/*.css']);
});

/* Clean js and map */
gulp.task('clean-ts', ['clean-ts-app']);

gulp.task('clean-ts-app', function () {
    return del([
        config.app + '**/*.js',
        config.app + '**/*.js.map'
    ]);
});