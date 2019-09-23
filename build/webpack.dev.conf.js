const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081, // По-умолчанию 8080 https://youtu.be/QF3EcxymIcc?t=905
    overlay:{ // Чтобы выводить ошибки компил¤ции в браузер
      warnings: true,
      errors: true,
    }
  },
  plugins:[
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});
//console.log(devWebpackConfig);
//module.export = devWebpackConfig;
module.exports = new Promise((resolve, reject) => {
 resolve(devWebpackConfig);
});
