const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('./tsconfig.json');

// App tasks

gulp.task('clean', gulp.series(() => {
  return gulp
    .src('dist', { allowEmpty: true })
    .pipe(clean());
}));

gulp.task('static', gulp.series('clean', () => {
  return gulp
    .src([
      'src/**/*.json'
    ], { allowEmpty: true })
    .pipe(gulp.dest('dist'));
}));

gulp.task('scripts', gulp.series('static', () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist', { allowEmpty: true }));
}));

gulp.task('build', gulp.series('scripts', (done) => done()));

gulp.task('watch', gulp.series('build', () => {
  return gulp.watch([
    'src/**/*.ts',
    'src/**/*.json'
  ], gulp.series('scripts', (done) => done()));
}));

// Default Task

gulp.task('default', gulp.parallel('watch', (done) => done()));
