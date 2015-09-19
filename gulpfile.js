var gulp = require('gulp');
var	concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var strip = require('gulp-strip-css-comments');
var browserSync = require('browser-sync');


gulp.task('default', ['browserSync','sass','cssConcat','imageMin','jsUglify','watch']);
// gulp.task('default', ['sass','cssConcat','imageMin','webserver','jsUglify','watch']);

gulp.task('sass', function () {
     gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/stylus/'));
});

gulp.task('cssConcat', function() {
	 gulp.src('./assets/stylus/**/*.css')	
	.pipe(autoprefixer())
	.pipe(uncss({
		html: ['./build/index.html', 'posts/**/*.html']
	}))	
	.pipe(concat('main.css'))
.pipe(strip({
	all: true,
    force: true,
    line: true,
    block: true,
   }))
	.pipe(cssmin())  	
	.pipe(gulp.dest('./build/css/'));
    });

gulp.task('jsUglify', function() {
     gulp.src (['./assets/js/*.js'])    
    .pipe(uglify())
    .pipe(concat('main.js'))    
    .pipe(gulp.dest('./build/js'));
});

// gulp.task('webserver', function() {
// 	 gulp.src('.')	
// 	 .pipe(webserver({
// 	  livereload: true,
//       directoryListing: true,
//       open: true
// 	 }))	
// });

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task('imageMin', function() {
	 gulp.src('./assets/img/**/*.*')	
	.pipe(imagemin({
		progressive: true
	}))	
	.pipe(gulp.dest('./build/img'));  
});

gulp.task('cssmin', function () {
         gulp.src('./build/css/main.css')
        .pipe(cssmin())     
        .pipe(gulp.dest('./build/css/'));
});


gulp.task('watch', function () {
	 gulp.watch('./assets/stylus/**/*.css', ['cssConcat']);	
	 gulp.watch('./assets/js/*.js', ['jsUglify']);
	 gulp.watch('./assets/scss/**/*.*', ['sass']);	
	 gulp.watch('./build/css/main.css', ['cssmin']);	
  	 gulp.watch('./build/index.html') .on('change', browserSync.reload);
	 gulp.watch('./build/css/main.css') .on('change', browserSync.reload);
 	 gulp.watch('./build/js/main.js') .on('change', browserSync.reload);
 	 gulp.watch('./build/img/**/*.*') .on('change', browserSync.reload);

	
});














