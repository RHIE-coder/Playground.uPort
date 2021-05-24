module.exports = function (config) {
  config.set({
    basePath: '',
    browsers: ['Chrome'],
    frameworks: [ 'mocha', 'chai' ],
    files: ['./unit/*.js', '../src/*.js'],
    preprocessors: {
      '../src/*.js': ['webpack', 'sourcemap'],
      './unit/*.js': ['webpack']
    },
    reporters: [ 'mocha', 'coverage' ],
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          }
        ]
      },
      node: { 
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        {type: 'text'},
        {type:'lcovonly', subdir: '.'},
        {type:'html', subdir: 'html'}
      ]
    },
    port: 9876,
    logLevel: config.LOG_INFO,
    browserNoActivityTimeout: 60000,
    autoWatch: true,
    // override to true for CI
    colors: true,
  });
};
