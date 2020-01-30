const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['app/*.json', 'app/**/*.json', '.env', 'package.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', gulp.series('scripts', () => {
  gulp.watch('app/**/*.ts', ['scripts']);
}));

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('watch', 'assets'));
