const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourceMaps = require("gulp-sourcemaps");
const gulpImgMin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const obfuscate = require("gulp-obfuscate");

function sassCopiler() {
  return gulp
    .src("./source/styles/*.scss")
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(sourceMaps.write("./maps"))
    .pipe(gulp.dest("./build/styles"));
}
function compressImg() {
  return gulp
    .src("./source/images/*")
    .pipe(gulpImgMin())
    .pipe(gulp.dest("./build/images"));
}
function compressJS() {
  return gulp
    .src("./source/scripts/*.js")
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest("./build/scripts"));
}
exports.default = function (done) {
  gulp.watch(
    "./source/styles/*.scss",
    { ignoreInitial: false },
    gulp.series(sassCopiler)
  );
  gulp.watch(
    "./source/images/*",
    { ignoreInitial: false },
    gulp.series(compressImg)
  );
  gulp.watch(
    "./source/scripts/*.js", // Corrigido caminho
    { ignoreInitial: false },
    gulp.series(compressJS)
  );
  done();
};
