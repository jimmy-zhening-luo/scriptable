var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject(
  "tsconfig.json"
);

// run 'gulp scripts'
gulp
.task(
  "scripts",
  function() {
    var tsResult = gulp
      .src(
        tsProject
        .src()
      )
      .pipe(
        tsProject()
      );
 
    return tsResult
      .js
      .pipe(
        gulp
        .dest(
          "dist"
        )
      );
  }
);
