var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Config
var webpackConfig = {
  entry: {
    vendor: [
      'jquery',
      'bootstrap/dist/js/bootstrap'
    ],
    'main': './src/main.browser.ts',
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src'),
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),

    new CopyWebpackPlugin([
      { from: 'src/assets/images', to: 'assets/images' }
    ]),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
   
    new webpack.ProvidePlugin({   
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
/*      { test: /\.css$/, 
        use: 
        [ 
            { loader: "style-loader" },
            { loader: "css-loader", options: { modules: true } }
        ]
      },*/
      { test: /\.(png|jpg|jpeg|gif|svg|ico)$/, loader: 'file' },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  }

};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ path.resolve(__dirname, 'node_modules') ]
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
