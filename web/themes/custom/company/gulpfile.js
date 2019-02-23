var gulp = require('gulp');
var livereload = require('gulp-livereload')
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('imagemin', function () {
  return gulp.src('images/*')
  .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  }))
  .pipe(gulp.dest('images'));
});

gulp.task('sass', function () {
  gulp.src('sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename('global.css'))    
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('uglify', function() {
  gulp.src('js/*.js')
    .pipe(uglify('global.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "axe.dd:8083"
    });
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/*.js', ['uglify']);
    gulp.watch(['css/style.css', '**/*.twig', 'js/*.js'], function (files){
        livereload.changed(files)
    });
});

gulp.task('default', ['watch']);