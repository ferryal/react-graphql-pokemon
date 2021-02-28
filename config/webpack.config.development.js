// @ts-check
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

const envPort = process.env.PORT || 3000;
const devServer = {
  contentBase: './build',
  disableHostCheck: true,
  historyApiFallback: true,
  hot: true,
  host: 'localhost',
  // @ts-ignore
  port: envPort,
  open: true,
};

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  // @ts-ignore
  devServer,
});
