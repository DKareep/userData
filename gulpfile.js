var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var envify = require('envify/custom');
var fs = require('fs');
var watchify = require("watchify");
process.env.NODE_ENV = "development";
var path = './js';
gulp.task('build', function(){
    'use strict';
  var b =   browserify({
        entries: path + '/belong.jsx',
        extensions: ['.jsx'],
        debug:  true,
      cache: {},
      packageCache: {},
      plugin: [watchify]
    });
    b.on('update', bundle);

    b.transform({presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread']},babelify);
        return b.bundle()
        .on('error', function(err){

            console.log(err.message);
            // end this stream
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(path + '/dist'));

    bundle();
    function bundle() {
        console.log('transformation completed 1');
        b.bundle().pipe(fs.createWriteStream(path + '/dist/bundle.js'));
        console.log('transformation completed 2');
    }

});
gulp.task('default', ['build']);