const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: []
});
 module.export = new Promise((resolve, reject) => {
   resolve(buildWebpackConfig);
 });
