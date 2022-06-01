module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 8060,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:9081/',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
}
