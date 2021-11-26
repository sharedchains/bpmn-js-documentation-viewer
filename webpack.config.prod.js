module.exports = {
  mode: 'production',
  entry: './lib/docviewer/docViewer.js',
  externals: {
    jquery: 'jQuery',
    bootstrap: 'bootstrap'
  },
  output: {
    library: 'DocViewer',
    libraryTarget: 'window',
    libraryExport: 'default',
    path: __dirname + '/dist/',
    filename: 'docViewer.bundle.js',
  },
  devtool: 'source-map'
};