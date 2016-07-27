var gulp = require('gulp')
  , gulpif = require('gulp-if')
  , argv = require('yargs').argv
  , concat = require('gulp-concat')
  , autoprefixer = require('gulp-autoprefixer')
  , sass = require('gulp-sass')
  , csso = require('gulp-csso')
  , buffer = require('vinyl-buffer')
  , uglify = require('gulp-uglify')
  , sourcemaps = require('gulp-sourcemaps')
  , plumber = require('gulp-plumber')
  , refresh = require('gulp-livereload')
  , server = require('tiny-lr')();

var src = {
  css: 'assets/css/',
  js: 'assets/js/',
  vendor: 'assets/js/vendor/',
  dest: 'assets/build/'
};

gulp.task('sass', function() {
  return gulp.src([
      src.css + 'main.scss'
    ])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(gulp.dest(src.dest))
    .pipe(refresh(server));
});

gulp.task('js', function() {
  return gulp.src([
    src.js + '*.js'
  ])
    .pipe(concat('main.js'))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(src.dest))
    .pipe(refresh(server));
});

gulp.task('vendor', function() {
  return gulp.src([
    src.vendor + 'jquery.js',
    src.vendor + '*.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(src.dest))
    .pipe(refresh(server));
});

gulp.task('watch', function() {
  server.listen(35729, function( err ) {
    if (err) return console.log(err);

    gulp.watch(src.css + '**/*.scss', ['sass']);
    gulp.watch(src.js + '*.js', ['js']);
    gulp.watch(src.vendor + '*.js', ['vendor']);

  });
});

gulp.task('build', ['sass', 'js', 'vendor']);
gulp.task('default', ['build', 'watch']);
