var gulp = require('gulp');
var webpack = require('gulp-webpack');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var imgmin = require('gulp-imagemin');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var fs = require('fs');
var rev = require('gulp-rev');
gulp.task('clear', function() {
	rimraf('./dist', function() {
		console.log('clear success');
	});
});
gulp.task('demo', function() {
	rimraf('./dist', function() {
		gulp.src(['./assets/img/demo/*'])
			.pipe(imgmin({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest('./dist/img/demo/'));

		gulp.src(['./assets/css/demo/*.css', './assets/css/common/*.css'])
			.pipe(concat('demo.min.css'))
			.pipe(minifyCss())
			.pipe(gulp.dest('./dist/css/demo/'));

		gulp.src(['./assets/js/vendor/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/vendor/'));

		if(fs.existsSync('./assets/js/demo/index.js')){
			gulp.src('./assets/js/demo/index.js')
			.pipe(webpack())
			.pipe(rename('index.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./dist/js/demo/'));
		}
	});
});
gulp.task('demo-rev', function() {
  // rev version
  	gulp.src(['./dist/js/demo/*.js', './dist/css/demo/*.css'], {
      base: './dist'
    })
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest('./dist/manifest.json', {
      base: './dist'
    }))
    .pipe(gulp.dest('./dist'));
});
