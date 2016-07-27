var gulp      = require('gulp'),
    sass      = require('gulp-ruby-sass'),
    prefix    = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    refresh   = require('gulp-livereload'),
    server    = require('tiny-lr')();

gulp.task('default', function() {
  gulp.src('assets/sass/style.scss')
     .pipe(sass({
         noCache      : true,
         precision    : 4,
         unixNewlines : true
     }))
     .pipe(prefix('last 3 version'))
     .pipe(minifycss())
     .pipe(gulp.dest('./assets/sass/style.scss'))
     .pipe(refresh(server));
});

gulp.task('watch', function() {
    server.listen(35729, function( err ) {
        if ( err ) { return console.log( err ); }

        gulp.watch('assets/sass/**/*.{sass,scss}', [
            'compileStyles'
        ]);
    });
});
