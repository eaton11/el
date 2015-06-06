var gulp = require("gulp");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("uglifyjs", function(){
	gulp.src("el.js")
	.pipe(uglify({preserveComments:"some"}))
	.pipe(rename("el.min.js"))
	.pipe(gulp.dest("."));
});