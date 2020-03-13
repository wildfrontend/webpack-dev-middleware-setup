const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const config = require('../webpack.config.js')
const compiler = webpack(config)

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }),
)
app.use(
    '/signalr/**',
    createProxyMiddleware({
        target: 'http://localhost:62678/',
        pathRewrite: { '^/signalr': '' },
        secure: false,
        logLevel: 'debug',
        ws: true,
        changeOrigin: true,
    }),
)
app.use(express.static('public'))

// 将文件 serve 到 port 3000。
app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n')
})
