var gulp = require('gulp');
var liveServer = require('live-server');
var config = require('../gulp.config')();

/* Start live server dev mode */
gulp.task('serve-dev', ['tsc-app'], function () {
    liveServer.start(config.liveServer.dev);
});