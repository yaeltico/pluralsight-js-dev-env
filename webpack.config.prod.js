import webpack from 'webpack';
import path from 'path';
import htmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a seperate bundle of vendor libraries so that thay are cached seperatly
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    
    // Create HTML file that includes reference to bundled JS
    new htmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      //Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: '41ef9ba54ca34482a5b8284feb9a2498'
    }),
    
    new webpack.LoaderOptionsPlugin({
      debug: true,
      noInfo: false,
    }),
  
    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ExtractTextPlugin.extract('css-loader?sourceMap')}
    ]
  }
}