console.log(__dirname);
module.exports = {
    mode: 'development',
    entry: "./lib/docViewer.js",
    externals: {
      jquery: 'jQuery',
      bootstrap: 'bootstrap'
    },
    output: {
      library: 'DocViewer',
      libraryTarget: 'window',
      libraryExport: 'default',
      path: __dirname + '/example',
      filename: 'docViewer.bundle.js',
    },
    devtool: 'cheap-module-source-map'    
};