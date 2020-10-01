const path = require('path');

module.exports = mode => ({
  mode,
  module: {
    rules: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, '..', 'src')],
      exclude: ['/node_modules/'],
      loader: 'babel-loader'
    }]
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'react-awesome-form-hook.min.js'
  }
});
