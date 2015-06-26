var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var wrap = require("gulp-wrap");
var plumber = require("gulp-plumber");
var include = require("gulp-include");
var replace = require("gulp-replace");

function compileJs(_scope){
	var bySamEaton = '/*!\n<el> by samueleaton\n*/';
	var includePolyfill = "\n//= include addEventListenerPolyFill.js\n";
	var globalFill = '\n(function(){\n\n<%= contents %>\n})();';
			globalFill = bySamEaton+globalFill+includePolyfill;
	var localFill = '\n<%= contents %>\n';
			localFill = bySamEaton+localFill+includePolyfill;

	return gulp.src(["src/*.*.js"])
		.pipe(plumber())
		.pipe(replace("#SCOPE#", ((_scope === "local")?"var ":"window.")))
		.pipe(concat("el.js"))
		.pipe(wrap( (_scope === "local")?localFill:globalFill ))
		.pipe(include())
		.pipe(gulp.dest("lib/"));
		// .pipe(gulp.dest("lib/"+_scope+"/")); //would make global directory
}

function uglifyJs(_scope){
	// return gulp.src("lib/"+_scope+"/el.js")
	return gulp.src("lib/el.js")
		.pipe(plumber())
		.pipe(uglify({preserveComments:"some"}))
		.pipe(rename("el.min.js"))
		// .pipe(gulp.dest("lib/"+_scope+"/"));
		.pipe(gulp.dest("lib/"));
}

gulp.task("compile-js-global", function(){
	return compileJs("global");
});
gulp.task("uglify-js-global", ["compile-js-global"], function(){
	return uglifyJs("global");
});

gulp.task("compile-js-local", function(){
	return compileJs("local");
});
gulp.task("uglify-js-local", ["compile-js-local"], function(){
	return uglifyJs("local");
});

gulp.task("watch", function(){
	gulp.watch(["src/*.js", "!src/classListPolyFill.js"], ["uglify-js-global","uglify-js-local"])
})

gulp.task("default", ["globalScope", "watch"]);
// gulp.task("default", ["globalScope", "localScope", "watch"]);
gulp.task("globalScope", ["uglify-js-global"]);
gulp.task("localScope", ["uglify-js-local"]);
