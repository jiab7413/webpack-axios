'use strict'
const path =require("path")

module.exports={
    dev: {
        // Various Dev Server settings
        contentBase: 'dist/',//本地服务器所加载的页面所在的目录
        host: 'localhost', // can be overwritten by process.env.HOST可以由process.env.HOST覆盖
        compress: true,//Enable gzip compression for everything served为所有服务启用gzip压缩
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些//实时刷新
        port: 9005, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined可以通过process.env.PORT覆盖，如果端口正在使用，则确定一个空闲端口
        hot:true,//Enable webpack's Hot Module Replacement feature启用webpack的热模块替换特性
        errorOverlay: true, //Shows a full-screen overlay in the browser在浏览器中显示全屏覆盖
        stats: "errors-only" ,//To show only errors in your bundle只显示包中的错误
        autoOpenBrowser:true, //When open is enabled, the dev server will open the browser.当启用open时，dev服务器将打开浏览器。
        proxyTable: {
            '/userApi': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite:{
                    '^/userApi': ''
                }
            }
        },//重定向
        assetsPublicPath:"./",
        assetsSubDirectory:"static",
        notifyOnErrors:true
    },
    build:{
        index:path.resolve( __dirname,"../dist/index.html"),
        assetsRoot:path.resolve( __dirname,"../dist"),
        assetsSubDirectory:"static",
        assetsPublicPath:"../",
        productionGzip: false,
        productionGzipExtensions: ['js','css'],
    }
}
