/*jslint node: true */ // allow 'require' global
'use strict';

var gulp = require('gulp'),
  del = require('del'),
  util = require('gulp-util'),
  path = require('path'),
  filter = require('gulp-filter'),
  tagVersion = require('gulp-tag-version');

var conf = {
    ts: {
      src: './src/**/*.ts',
      example: './examples/**/*.ts',
      dist: ['./examples/', './src/']
    },
    docs: path.join(__dirname, 'docs'),
    tests: path.join(__dirname, 'test'),
    packageJson: require(path.join(__dirname, 'package.json')),
    tsConfig: require(path.join(__dirname, 'src/tsconfig.json'))
};

gulp.task('test', require('./tasks/test-unit')(conf.tests));
gulp.task('compile-examples', require('./tasks/compileExamples')(gulp, [conf.ts.example, conf.ts.src], conf.ts.dist));
// deletes the dist folder for a clean build
//gulp.task('generate-typeinfo', require('./tasks/generateTypeinfo')(gulp, conf));
gulp.task('clean', require('./tasks/clean')(gulp, conf.ts.dist));

gulp.task('build', ['clean', 'compile-examples','test']);

gulp.task('bump', require('./tasks/bump')(gulp));

// watch scripts, styles, and templates
gulp.task('watch', function() {
  gulp.watch([conf.ts.src, conf.ts.example],['compile-examples','test']);
});

// default
gulp.task('default', ['build', 'watch']);
