var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    modeler: './example/modeler.js'
  },
  externals: {
    jquery: 'jQuery',
    bootstrap: 'Bootstrap'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/example'
  },
  module: {
    rules: [
      {
        test: /\.bpmn$/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './node_modules/bpmn-js/dist/assets/**/*', to: '.' },
        { from: './assets/**/*', to: '.' },
        { from: './assets/css/docViewer.css', to: './style'}
      ]
    })
  ],
  devtool: 'cheap-module-source-map'
};