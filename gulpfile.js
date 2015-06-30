'use strict';

var gulp = require('gulp'),
	gls = require('gulp-live-server')

var config = {
	server: './bin/www'
};

gulp.task('wiredep', function () {
	gulp.src('./server/views/index.ejs')
		.pipe(wiredep(
			{ignorePath: /\.\.\//}
		))
		.pipe(gulp.dest('./server/views/index.ejs'));

});

gulp.task('serve', function () {
	//1. run your script as a server
	var server = gls.new(config.server);
	server.start();
});