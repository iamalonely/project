module.exports = {
  lintOnSave: false,
  publicPath: './',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
        // 为生产环境修改配置...
        config.mode = 'development';
    } else {
        // 为开发环境修改配置...
        config.mode = 'production';
    }
  },
  devServer: {
    port: 8080, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // proxy: {
    //     '/api': {
    //         target: process.env.VUE_APP_BASEURL,
    //         ws: true,
    //         changeOrigin: true,
    //         pathRewrite: {
    //           '^/api': ''
    //         }
    //     },
    // },
    overlay: {
      warnings: true,
      errors: true
    }
  }
}