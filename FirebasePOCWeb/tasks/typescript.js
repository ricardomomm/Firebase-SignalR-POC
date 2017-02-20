var gulp = require('gulp');
var config = require('../gulp.config')();
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');

/* Initialize TS Project */
var typingFiles = [
    'typings/browser.d.ts'
];
var tsFiles = [].concat(config.tsFiles);

/* Watch changed typescripts file and compile it */
gulp.task('watch-ts', function () {
    return gulp.watch(tsFiles, function (file) {
        console.log('Compiling ' + file.path + '...');
        return compileTs(file.path, true);
    });
});

/* Compile typescripts */
gulp.task('tsc', ['clean-ts'], function () {
    return compileTs(tsFiles);
});

gulp.task('tsc-app', ['clean-ts-app'], function () {
    return compileTs(config.tsFiles);
});

/* Lint typescripts */
gulp.task('tslint', function () {
    return lintTs(tsFiles);
});

gulp.task('tslint-app', function () {
    return lintTs(config.tsFiles);
});

function lintTs(files) {
    return gulp.src(files)
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report({
          summarizeFailureOutput: true
        }));
}

function compileTs(files, watchMode) {
    watchMode = watchMode || false;
    var tsProject = ts.createProject(config.root + 'tsconfig.json');
    var allFiles = [].concat(files, typingFiles);
    var res = gulp.src(allFiles, {
            base: '.'
        })
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true,
            emitError: !watchMode
        }))
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on('error', function () {
            process.exit(1);
        });

    return res.js
    .pipe(sourcemaps.write('.', {
            // Return relative source map root directories per file.
            includeContent: false,
            sourceRoot: function (file) {
            var sourceFile = path.join(file.cwd, file.sourceMap.file);
            return path.relative(path.dirname(sourceFile), file.cwd);
            }
        }))
    .pipe(gulp.dest(config.root));
}