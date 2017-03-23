// Karma configuration
// Generated on Wed Dec 28 2016 12:50:33 GMT+0800 (中国标准时间)
var webpack = require('webpack');
var path = require('path');
var nodemodulesPath = path.resolve(__dirname, 'node_modules');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    preprocessors: {
        'test/**/*.spec.js': ['webpack']
    },

    reporters: ['progress', 'coverage'],
 
    // add
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    // webpack
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [nodemodulesPath],
          query: {
            presets: ['es2015'],
            plugins: ['istanbul', 'transform-object-rest-spread'],
            sourceMaps: ['eval']
          }}]
      }
    }
  })
}
