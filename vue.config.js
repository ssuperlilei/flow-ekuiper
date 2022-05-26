module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 8060,
    // proxy: {
    //   '/api/dashboard': {
    //     target: process.env.HOST_URL,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api/dashboard': '/emqx/api/v4',
    //     },
    //   },
    // },
  },
}
