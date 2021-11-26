var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';

  const config = {
    mode,
    entry: {
      'bpmn-js-documentation-viewer': './lib/docViewer/docViewer.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/dist',
      library: 'docViewerModule',
      libraryTarget: 'window',
      libraryExport: 'default'
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: './assets/**/*', to: '.' },

          // { from: './node_modules/bpmn-js/dist/assets/**/*', to: '.' }
        ]
      })
    ],
    externals: {
      'jquery': 'jQuery',
      'bootstrap': 'bootstrap'
    },
    devtool: 'cheap-module-source-map'
  };

  if (mode === 'production') {
    config.devtool = 'source-map';
  }

  return config;
};
