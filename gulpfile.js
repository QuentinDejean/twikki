'use strict';

var gulp = require('gulp'),
    gls = require('gulp-live-server'),
	wiredep = require('wiredep').stream;

var config = {
    server: './bin/www',
	index: './server/views/index.ejs'
};

gulp.task('bower', function () {
	gulp.src(config.index)
		.pipe(wiredep({directory: './client/javascripts/bower_components'}));
});

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
