var gulp = require('gulp')
  , connect = require('connect')
  , connectLiveReload = require('connect-livereload')
  , serveStatic = require('serve-static')
  , livereload = require('gulp-livereload')

  , wiredep = require('wiredep').stream
  , ngHtml2js = require('gulp-ng-html2js')
  , uglify = require('gulp-uglify')
  , minifyHtml = require('gulp-minify-html')
  , concat = require('gulp-concat')


  , watchInterval = 500
  , server;
;


/*------------------------------------------------------------------------------
 * Run gulp help to find all tasks with descriptions
 ------------------------------------------------------------------------------*/

/*
 *
 */

gulp.task('wiredep', function () {
  return gulp
    .src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('src'));
});


gulp.task('ngHtml2js', function() {
  return gulp
    .src(['src/**/*.html'])
    .pipe(minifyHtml({
      empty: true,
      quotes: true
    }))
    .pipe(ngHtml2js({
      moduleName: 'fd.minified-templates'
    }))
    .pipe(uglify())
    .pipe(concat('minified-templates.js'))
    .pipe(gulp.dest('src/common'));
});


/*------------------------------------------------------------------------------
 * Server and watchers
 ------------------------------------------------------------------------------*/

gulp.task('serve', ['wiredep'], function(next) {
  server = connect();
  server.use(connectLiveReload());
  server.use(serveStatic('src'));
  server.listen(1212, next);
});


gulp.task('watch', ['serve'], function() {
  // start the livereload server
  livereload.listen();

  // auto-wire bower dependencies
  gulp
    .watch([
      'bower.json'
    ], { interval: watchInterval }, ['wiredep', 'karmaWiredep']);

  // auto-wire custom scripts, lint
  //gulp
  //  .watch([
  //    'src/**/*.html',
  //    'src/**/*.js',
  //    '!' + 'src/index.html',
  //    '!' + 'src/common/minified-templates.js',
  //    '!' + 'src/vendor'
  //  ], { interval: watchInterval }, ['angularInject', 'jshint']);

  // CSS linting
  //gulp
  //  .watch([
  //    'src/**/*.css'
  //  ], { interval: watchInterval }, ['csslint']);

  // files that should trigger a live reload
  gulp
    .watch([
      'src/index.html',
      'src/common/minified-templates.js'
    ], { interval: watchInterval })
    .on('change', livereload.changed);
});

gulp.task('default', ['watch']);

