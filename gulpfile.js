var gulp = require('gulp')
var connect = require('gulp-connect')

var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')

var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var merge = require('utils-merge')

/* nicer browserify errors */
var gutil = require('gulp-util')
var chalk = require('chalk')

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }
}

function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'));
}

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 3000,
    livereload: true
  })
})

gulp.task('watch', function () {
  var args = merge(watchify.args, { debug: true })
  var bundler = watchify(browserify({
                    entries: './src/app.jsx',
                    extensions: [' ', '.js', '.jsx']
                  }, args)).transform(babelify, {
                                      presets: ['es2015', 'react'],
                                      plugins: ['transform-class-properties', 'transform-object-rest-spread']
                                    })
  bundle_js(bundler)

  bundler.on('update', function () {
    gutil.log(chalk.blue('re-building...'));
    bundle_js(bundler)
  })
  bundler.on('log', gutil.log)
})

gulp.task('default', ['connect', 'watch'])
