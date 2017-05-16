'use strict';

var gulp = require('gulp');

// handlebars
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

// for that SASS
var sass = require('gulp-sass');

// in browser source maps for css debugging
var sourcemaps = require('gulp-sourcemaps');

// puts all SASS in one file
var concat = require('gulp-concat');

gulp.task('scripts', function() {
	console.log("Gulp Task: scripts");
	
	return gulp.src(['./src/*.js','./src/js/*.js'])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
	console.log("Gulp Task: sass");

	return gulp.src('./src/scss/*.scss')
	.pipe(concat('style.css'))
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./src/scss/*.scss', ['sass']);
});

gulp.task('autobuild',function(){
	gulp.watch(['./src/scss/*.scss','./src/*.js','./src/partials/*.handlebars','./src/js/*.js'],['build']);

});

gulp.task('handlebars',function(){
	console.log("Gulp Task: handlebars");
});

gulp.task('build',['scripts','sass','handlebars','shred']);

gulp.task('shred', function () {
    var templateData = {
        firstName: 'Max'
    },
 //    navOptions = {
	// 	links: [
	// 	{
	// 		text: "VolzBrew",
	// 		url: "#"
	// 	},{
	// 		text: "About",
	// 		url: "#about"
	// 	},
	// 	{
	// 		text: "Blog",
	// 		url: "#blog"
	// 	}]
	// },
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false 
        // partials : {
        //     footer : '<footer>the end</footer>'
        // },
        batch : ['./src/partials'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }
    return gulp.src('src/partials/body.handlebars')
        // .pipe(handlebars(templateData, options, navOptions))
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'));
});