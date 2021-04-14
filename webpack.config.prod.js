const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic', // 将模块 id 固定
    splitChunks: {
      cacheGroups: {
        vendor: {
          minSize: 0, // 只要是 node_modules 里面的就抽出来
          maxSize: 2000000, // 最大 200kb，再大就分包
          priority: 10,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all' // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/index.[contenthash].css'
    })
  ]
});
