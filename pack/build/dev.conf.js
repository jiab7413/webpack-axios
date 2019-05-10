const webpack = require('webpack');
const path =require("path");
const backConfig = require('../config');
const WebpackBase=require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');    //html入口文件
const CopyWebpackPlugin = require("copy-webpack-plugin");
const merge=require('webpack-merge')    //合并文件安装babel-loader和babel-core
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');    //开启gzip文件压缩
const friendlyErrorsWebpackPlugin=require("friendly-errors-webpack-plugin");    //清理webpack编译时的无用信息
const portfinder=require("portfinder")    //端口查询器（查找开放端口）



const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT);
const devConfig=merge(WebpackBase,{
    devServer:{
        clientLogLevel: 'warning',  //当使用内联模式(inline mode)时，会在开发工具(DevTools)的控制台(console)显示消息，这里显示警告信息，
        // contentBase: backConfig.dev.contentBase,//本地服务器所加载的页面所在的目录
        contentBase: false,//本地服务器所加载的页面所在的目录 这块我们使用了copyWebpackPlugin
        host: HOST || backConfig.dev.host, //可以由process.env.HOST覆盖
        port:PORT || backConfig.dev.port, //可以通过process.env.PORT覆盖，如果端口正在使用，则确定一个空闲端口
        compress: backConfig.dev.compress,//为所有服务启用gzip压缩
        historyApiFallback: {    //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
            rewrites: [
                { from: /.*/, to: path.posix.join( backConfig.dev.assetsPublicPath,"index.html") },
            ],
        },
        //inline: backConfig.dev.inline,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些//实时刷新
        //port:backConfig.dev.port, // 可以通过process.env.PORT覆盖，如果端口正在使用，则确定一个空闲端口
        hot:backConfig.dev.hot,//启用webpack的热模块替换特性
        overlay: backConfig.dev.errorOverlay   // 编译出现错误时，将错误直接显示在页面上
            ? { warnings: false, errors: true }
            : false, //Shows a full-screen overlay in the browser在浏览器中显示全屏覆盖
        stats:backConfig.dev.stats ,//只显示包中的错误
        open:backConfig.dev.autoOpenBrowser, //当启用open时，dev服务器将打开浏览器。
        proxy:backConfig.dev.proxyTable,   //重定向，反向代理；
        quiet:true,     //与friendlyErrorsWebpackPlugin一起用，当设置其为true，则需要配置friendlyErrorsWebpackPlugin
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),//模块热替换,模块热替换会在应用程序运行过程中替换、删除和添加模块，无需重新加载页面
        new webpack.NamedModulesPlugin(), //热加载时直接返回更新的文件名，而不是文件id
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            title:'首页',
            // chunk:["index"]
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to:backConfig.dev.assetsSubDirectory,
                ignore:['.*']
            }
        ]),
        new ExtractTextWebpackPlugin({     //提取文件中的css样式
            filename:backConfig.build.assetsSubDirectory+"/css/[name].[chunkhash].css",  //生成文件
            allChunks: true,
            publicPath:"./",
        }),
    ]
});
if(backConfig.build.productionGzip){  //是否开启文件压缩
    devConfig.plugins.push(
        new CompressionWebpackPlugin({   //gzip文件压缩
            asset:'[path].gz[query]',
            algorithm:'gzip',
            test: new RegExp(
                '\\.(' +
                backConfig.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold:0,//只处理比这个值大的资源。按字节计算
            minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
        })
    )
}
module.exports = new Promise((resolve, reject) => {    //portfinder支持promise
    portfinder.basePort = process.env.PORT || backConfig.dev.port  //默认端口
    portfinder.getPort((err, port) => {    //portfinder.getPort()方法（参数为错误，端口号）
        if (err) {
            reject(err)
        } else {
            // 产生新的端口
            process.env.PORT = port
            // 将新的端口添加到devServer中的port
            devConfig.devServer.port = port
            // 添加webpack编译清理插件
            devConfig.plugins.push(new friendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devConfig.devServer.host}:${port}`],
                },
                onErrors: backConfig.dev.notifyOnErrors || undefined
            }))
            resolve(devConfig)   //成功返回devConfig
        }
    })
})
