'use strict';

var gulp = require('gulp'),
    gls = require('gulp-live-server');

var config = {
    server: './bin/www'
};

gulp.task('serve', function() {
    //1. run your script as a server
    var server = gls.new(config.server);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    //gulp.watch(['static/**/*.css', 'static/**/*.html'], function () {
    //    server.notify.apply(server, arguments);
    //});
    //gulp.watch(config.server, server.start.bind(server)); //restart my server
});
