const config = require('../../config')

export default {
  // 配置显示在浏览器标签的title
  title: 'wending.fund',
  // 域名
  domain: 'http://127.0.0.1:8080',
  // 基本URL：服务器API，打包发布
  // baseUrl: 'http://127.0.0.1:3100/api'
  // 基本URL：本地API，本地开发
  baseUrl: 'http://' + config.dev.host + ':' +  config.dev.port + '/dev/api'
}