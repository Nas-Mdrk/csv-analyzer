/*const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    watchOptions: {
      poll: 1000, // Vérifie les changements toutes les secondes
    },
  },
})
*/
/*
module.exports = {
  devServer: {
    port: 8080,
    hot: true,
    open: true,
  },
};
*/
// vue.config.js
module.exports = {
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://newbackcsv-production.up.railway.app',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        ws: true, 
      },
    },
  },
};
