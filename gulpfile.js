var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
// for production build:
    // var streamify = require('gulp-streamify');
    // var uglify = require('gulp-uglify');

//Sets up all of the paths
var path = {
  HTML: 'client/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist/client',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/client',
  ENTRY_POINT: './client/js/App.js'
};

// Copies HTML file, replaces script source with the bundled source.
gulp.task('replaceHTMLsrc', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

// watches HTML and JS for changes, browserify and reactifys JS, and bundles it all.
gulp.task('watch', function() {
  gulp.watch(path.HTML, ['replaceHTMLsrc']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    var date = new Date();
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated @ ' + date.toTimeString());
    })
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.end();
    })
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('default', ['replaceHTMLsrc', 'watch']);

// Version 1.2.0 of gulp-uglify uses a breaking version of UglifyJS (2.4.19)
// We can update this once we start needing to deal with production

// gulp.task('build', function(){
//   browserify({
//     entries: [path.ENTRY_POINT],
//     transform: [reactify]
//   })
//     .bundle()
//     .pipe(source(path.MINIFIED_OUT))
//     .pipe(streamify(uglify(path.MINIFIED_OUT)))
//     .pipe(gulp.dest(path.DEST_BUILD));
// });

// gulp.task('replaceHTML', function(){
//   gulp.src(path.HTML)
//     .pipe(htmlreplace({
//       'js': 'build/' + path.MINIFIED_OUT
//     }))
//     .pipe(gulp.dest(path.DEST));
// });

// gulp.task('production', ['replaceHTML', 'build']);
