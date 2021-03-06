// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./frontend/index.tsx'],
  devtool: 'eval-source-map',
  performance: {
    hints: false
  },
  watch: false,
  plugins: [  
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),
    isDevelopment && new HtmlWebpackPlugin({
      template: './development/index.html'
    }),
    isDevelopment && new ReactRefreshPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          isDevelopment && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] }
          },
          {
              loader: "ts-loader"
          }
        ].filter(Boolean)
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment && 'style-loader',
          !isDevelopment && MiniCssExtractPlugin.loader,
          'css-loader'
        ].filter(Boolean)
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'transformerviz/assets'),
    publicPath: '/',
    filename: 'app-build.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, "development"),
    port: 3000
  }
};

