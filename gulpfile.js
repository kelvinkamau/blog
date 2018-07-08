const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './'
  });

  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp
    .src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
