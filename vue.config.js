const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //开发环境配置
  devServer: {
    port: 8088,
	proxy: {
		'/api': {
			target: 'http://172.18.10.122:8080', 
			ws: true, 
			changeOrigin: true,
			pathRewrite: {
				'^/api': '/'
			}
		}
	}
  }
})
