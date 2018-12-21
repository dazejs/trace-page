const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    template: "./template.js",
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js",
  },
  module: {
    rules: [
      {                
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,                
        loader: ExtractTextPlugin.extract([ 
          'css-loader',                    
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
                }),
                // require('cssnano')()
              ],
            },
          },
          'less-loader'
        ])
      },
      {
      test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader'
      },
      {
      test: require.resolve('code-prettify'),
        loader: 'exports-loader?window.PR!script-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: './template/index.html', 
      filename: './view/index.html', 
      inlineSource: '.(js|css)$',
      chunks: ['template']
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
  ]
}