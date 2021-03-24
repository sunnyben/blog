const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
let path = require('path')

const devConfig = {
  /**
  * 打包模式，不配置会警告，但底层还是会去配置默认的，就是production
  * production: 压缩模式，被压缩的代码
  * development: 开发模式，不压缩的代码
  *
  */
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/static/'
    // path: 'E:\\cmwork\\star\\idreamsky-sar\\templets\\hl_donghua',
  },
  // 监听
  watch: true,
  watchOptions: {
    poll: 1000, // 每秒询问多少次
    aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
    ignored: /(node_modules|dist|dist_dev|scripts)/ //忽略时时监听
  },
  
}
module.exports = merge(commonConfig, devConfig);