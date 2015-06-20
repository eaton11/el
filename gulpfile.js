var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var wrap = require("gulp-wrap");
var plumber = require("gulp-plumber");
var include = require("gulp-include");

gulp.task("compile-js", function(){
	var bySamEaton = '/*!\n<el> by samueleaton\n*/';
	var includePolyfill = "\n//= include addEventListenerPolyFill.js\n";

	return gulp.src(["src/*.*.js"])
	.pipe(plumber())
	.pipe(concat("el.js"))
	.pipe(wrap( bySamEaton+'\n(function(){\n\n<%= contents %>\n})();'+includePolyfill ))
	.pipe(include())
	.pipe(gulp.dest("lib/"));
});

gulp.task("uglify-js", ["compile-js"], function(){
	return gulp.src("lib/el.js")
	.pipe(plumber())
	.pipe(uglify({preserveComments:"some"}))
	.pipe(rename("el.min.js"))
	.pipe(gulp.dest("lib/"));
});

gulp.task("watch", function(){
	gulp.watch("src/*", ["uglify-js"])
})

gulp.task("default", ["uglify-js", "watch"]);