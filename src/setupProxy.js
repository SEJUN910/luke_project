const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/crm', {
        target: 'https://stat.godpeople.com/',
        changeOrigin: true,
    })
  )
};