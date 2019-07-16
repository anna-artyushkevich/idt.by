var gulp = require('gulp');
var del = require('del');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var input = 'src/less/styles.less';
var output = 'src/css/';

gulp.task('clean', function() {
  	return del('src/css/*.css');
});

gulp.task('less', gulp.series('clean', function () {
	return gulp.src(input)
	.pipe(sourcemaps.init())
		.pipe(less({errLogToConsole: true, outputStyle: 'compressed'}))
		.pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
        .pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(output))
    .pipe(reload({ stream:true }));
}));

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
	    server: {
	      	baseDir: 'src'
	    }
	});

    gulp.watch(['less/**/*.less'], {cwd: 'src'}, gulp.series('less'));
  	gulp.watch(['*.html', 'css/styles.css', 'img/*.*'], {cwd: 'src'}, reload);
});

gulp.task('build', gulp.series('less', 'serve'));

gulp.task('default', gulp.parallel('build'));
