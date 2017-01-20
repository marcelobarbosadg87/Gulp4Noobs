
// Carrega todos os módulos e plugins do Gulp

var gulp = require('gulp')
	, imagemin = require('gulp-imagemin')
	, clean = require('gulp-clean')
	, concat = require('gulp-concat')
	, htmlReplace = require('gulp-html-replace')
	, uglify = require('gulp-uglify')
	, usemin = require('gulp-usemin')
	, cssmin = require('gulp-cssmin')
	, browserSync = require('browser-sync')
	, jshint = require('gulp-jshint')
	, csslint = require('gulp-csslint')
	, autoprefixer = require('gulp-autoprefixer');



// Default Task - tarefa padrão do gulp

gulp.task('default', ['copy'],  function(){

	gulp.start('build-img', 'build-js', 'build-html');

});


// COPY - tarefa para copiar as pastas src para dist

gulp.task('copy', ['clean'] , function(){

	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));

});

// CLEAN - tarefa para limpar o diretorio 


gulp.task('clean', function(){
	
	return gulp.src('dist')
		.pipe(clean());
})


// Build IMG - tarefa para minificar as imagens

gulp.task('build-img', function(){

	gulp.src('dist/img/**/*')
		.pipe(imagemin())
			.pipe(gulp.dest('dist/img'));

});

// Build JS - tarefa para concatenar e minificar (uglify) os arquivos js

gulp.task('build-js', function(){

	gulp.src(['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produto.js' ])
		.pipe(concat('all.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'));

});

// Build HTML - tarefa para substituir os arquivos separados para 1 único arquivo

gulp.task('build-html', function() {

	gulp.src('dist/**/*.html')
		.pipe(htmlReplace({
			js: 'js/all.js'
		}))
			.pipe(gulp.dest('dist'));

});


// Usemin - plugin para facilitar a minificacao

gulp.task('usemin', function (){

	gulp.src('dist/**/*.html')
		.pipe(usemin({
			'js' : [uglify]
			,'css' : [autoprefixer, cssmin]


		}))
		.pipe(gulp.dest('dist'));
});

// SERVER - Browser Sync - sincroniza o browser, pode ser usado com outros servidores - configurar o proxy

gulp.task('server', function() {



	browserSync.init({

		server: {
			baseDir: 'src'
		}
	});

	// plugin para estilizar os erros do jshint 

	gulp.watch('src/js/*.js').on('change', function(event){
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter());
	});

	// // plugin para fazer o css lint

	// gulp.watch('src/css/*.css').on('change', function(event){
	// 	gulp.src(event.path)
	// 		.pipe(csslint())
	// 		.pipe(csslint.reporter());
	// });



	// recarrega o navegador sempre que alguma alteraçao for feita

	gulp.watch('src/**/*')
		.on('change', function() {

			browserSync.reload();

		});

});
