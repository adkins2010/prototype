const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const merge = require("merge-stream");

gulp.task("clean:lib", function () {
  return del(["lib"]);
});

gulp.task("build:lib", function () {
  let js = gulp.src([ "./src/**/*.js", "!./src/index.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({presets:["react-app"]}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("lib"));

  let css = gulp.src([ "./src/**/*.css", "!./src/index.css"])
    .pipe(gulp.dest("lib"));

  return merge(js, css);
});

const intercept = require("gulp-intercept");
const gulpFile = require("gulp-file");
const path = require("path");

gulp.task("generate:exports", function() {

  const re1 = /export\s*?{\s+(.+?)^[\sas\s]\s*?}/;
  const re2 = /export\s*?\s+(.+?)\s*?/;
  const re3 = /export\s*?{\s(.*?)\s*?as\s*?([^\s].*?)\s*?}/;

  let exportsContent = "";
  gulp.src(["src/**/*.js", "!node_modules", "!build", "!lib", "!dist", "!docs"])
    .pipe(intercept(function(file) {

      if (file.contents && typeof file.contents.toString === "function")
      {
        let contents = file.contents.toString();
        let relativePath = path.relative(file.cwd + "/src", file.path);
        let match = re1.exec(contents);
        if (match && match.length > 1)
        {
          let exportString =  "export { " + match[1] + " } from \"./" + relativePath + "\";\n";
          exportsContent += exportString;
        }

        match = re2.exec(contents);
        if (match && match.length > 1)
        {
          let baseName = path.basename(relativePath).slice(0, -3);
          let exportString = "export { default as " + baseName + " } from \"./" + relativePath + "\";\n";
          exportsContent += exportString;
        }

        match = re3.exec(contents);
        if (match && match.length > 1)
        {
          let baseName = path.basename(relativePath).slice(0, -3);
          let exportString = "export { " + match[2] + " } from \"./" + relativePath + "\";\n";
          exportsContent += exportString;
        }
      }

      gulpFile("exports.js", exportsContent)
        .pipe(babel({presets:["es2015"]}))
        .pipe(gulp.dest("lib"));
      return file;
    }));
});
