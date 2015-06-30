'use strict';

var gulp = require('gulp'),
	gls = require('gulp-live-server'),
	open = require('gulp-open');

var config = {
	server: './bin/www',
	client: './client/app',
	host: 'localhost',
	port: 3000
};

gulp.task('wiredep', function () {
	gulp.src('./server/views/index.ejs')
		.pipe(wiredep(
			{ignorePath: /\.\.\//}
		))
		.pipe(gulp.dest('./server/views/index.ejs'));

});

gulp.task('open', function () {
	var options = {
		url: 'http://' + config.host + ':' + config.port,
		app: 'google chrome'
	};

	gulp.src('./server/views/index.ejs')
		.pipe(open('', options));
});

gulp.task('connect', function () {
	//1. run your script as a server
	var server = gls.new([config.server, './client']);
	server.start();


	gulp.watch([
		config.client + '/**/*.css',
		config.client + '/**/*.js',
		config.client + '/**/*.html'
	], function () {
		server.notify.apply(server, arguments);
	});
});


gulp.task('serve', function () {
	gulp.start('connect', 'open');
});


