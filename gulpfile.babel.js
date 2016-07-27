import gulp from 'gulp'
import gulpif from 'gulp-if'
import {argv} from 'yargs'
import concat from 'gulp-concat'
import autoprefixer from 'gulp-autoprefixer'
import sass from 'gulp-sass'
import csso from 'gulp-csso'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'

const dirs = {
  css: 'assets/css',
  js: 'assets/js',
  vendor: 'assets/js/vendor',
  dest: 'assets/build'
}

gulp.task('sass', () => {
  return gulp.src([
      `${dirs.css}/main.scss`
    ])
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(gulp.dest(dirs.dest))
})

gulp.task('js', () => {
  return gulp.src([
    `${dirs.js}/*.js`
  ])
    .pipe(concat('main.js'))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(dirs.dest))
})

gulp.task('vendor', () => {
  return gulp.src([
    `${dirs.vendor}/jquery.js`,
    `${dirs.vendor}/*.js`
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(dirs.dest))
})

gulp.task('watch', () => {
  gulp.watch(`${dirs.css}/**/*.scss`, ['sass'])
  gulp.watch(`${dirs.js}/*.js`, ['js'])
  gulp.watch(`${dirs.vendor}/*.js`, ['vendor'])
})

gulp.task('build', ['sass', 'js', 'vendor'])
gulp.task('default', ['build', 'watch'])
