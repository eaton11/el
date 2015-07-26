var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var wrap = require("gulp-wrap");
var plumber = require("gulp-plumber");
var include = require("gulp-include");
var replace = require("gulp-replace");

function compileJs(_version){
	var bySamEaton = '/*!\n<el> by samueleaton\n*/';
	var addEventListenerPolyFill = "\n//= include addEventListenerPolyFill.js\n";
	var libFill = '\n(function(){\n\n<%= contents %>\n})();';
	var modernFill = bySamEaton+libFill;
	var legacyFill = bySamEaton+libFill+addEventListenerPolyFill;

	return gulp.src(["src/"+_version+"/*.*.js"])
		.pipe(plumber())
		.pipe(concat("el.js"))
		.pipe(wrap( (_version === "legacy") ? legacyFill : modernFill ))
		.pipe(include())
		// .pipe(gulp.dest("lib/"+_version+"/"));
		.pipe(gulp.dest("lib/"));
}

function uglifyJs(_version){
	// return gulp.src("lib/"+_version+"/el.js")
	return gulp.src("lib/"+_version+"/el.js")
		.pipe(plumber())
		.pipe(uglify({preserveComments:"some"}))
		.pipe(rename("el.min.js"))
		// .pipe(gulp.dest("lib/"+_version+"/"));
		.pipe(gulp.dest("lib/"));
}

gulp.task("compile-js-modern", function(){
	return compileJs("modern");
});
gulp.task("uglify-js-modern", ["compile-js-modern"], function(){
	return uglifyJs("modern");
});

gulp.task("compile-js-legacy", function(){
	return compileJs("legacy");
});
gulp.task("uglify-js-legacy", ["compile-js-legacy"], function(){
	return uglifyJs("legacy");
});

gulp.task("watch", function(){
	gulp.watch(["src/**", "!src/legacy/classListPolyFill.js"], ["uglify-js-modern","uglify-js-legacy"])
})

gulp.task("watch-modern", function(){
	gulp.watch(["src/modern/**"], ["uglify-js-modern"])
})

gulp.task("default", ["modern", "legacy", "watch"]);
gulp.task("modern", ["uglify-js-modern", "watch-modern"]);
gulp.task("legacy", ["uglify-js-legacy"]);
