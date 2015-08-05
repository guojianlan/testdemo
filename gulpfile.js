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
var path = require('path');
var named = require('vinyl-named');
var sass = require('gulp-ruby-sass');
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

		if (fs.existsSync('./assets/js/demo/index.js')) {
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

gulp.task('act', function() {
	var targetDir = gulp.env.dir.toString();
	console.log(targetDir);
	var sources = path.join('./assets/js/act/', targetDir, '/act.js');
	//rimraf('./dist', function() {
		gulp.src('./assets/js/vendor/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('./dist/js/vendor/'));

		if (targetDir && fs.existsSync(sources)) {
			gulp.src(sources)
				.pipe(named())
				.pipe(webpack({
					module: {
						test: /\.jsx$/,
						loaders: [{
							loader: 'jsx-loader?insertPragma=React.DOM&harmony'
						}],
					},
					resolve: {
						extensions: ['', '.js', '.jsx']
					}
				}))
				.pipe(uglify())
				.pipe(gulp.dest(path.join('./dist/js/act/', targetDir)));
		}
	//});
});

gulp.task('sasstest',function(){
	return sass('./assets/css/demo/test.scss')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(concat('test.min.css'))
        //.pipe(rename())
        .pipe(gulp.dest('./assets/css/demo/'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./assets/css/demo/*.scss', ['sasstest']);
});
gulp.task('h5-react', function() {
		if (fs.existsSync('./assets/js/h5/TableModule/index.js')) {
			gulp.src('./assets/js/h5/TableModule/index.js')
				.pipe(webpack({
					module: {
						test: /\.jsx$/,
						loaders: [{
							loader: 'jsx-loader?insertPragma=React.DOM&harmony'
						}],
					},
					resolve: {
						extensions: ['', '.js', '.jsx']
					}
				}))
				.pipe(rename('index.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest('./dist/js/h5/TableModule/'));
		}
});
gulp.task('default', ['demo']);