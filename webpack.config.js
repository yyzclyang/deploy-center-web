const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'static/js/[name].[contenthash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader:
              process.env.NODE_ENV !== 'production'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true
              }
            }
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', 'ts', 'tsx']
    }),
    new HtmlWebpackPlugin({
      title: 'webpack5-with-react',
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: 'body'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
};
