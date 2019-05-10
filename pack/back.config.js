const webpack = require('webpack')
const path =require('path')
const backConfig = require('./config')    //路径配置
const HtmlWebpackPlugin = require('html-webpack-plugin')    //html入口文件
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')    //压缩文件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const WebpackBase=require('./build/webpack.base')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const merge=require('webpack-merge')

const buildConfig=merge(WebpackBase,{
    output: {
        path: backConfig.build.assetsRoot,   //出口的目录
        filename:  backConfig.build.assetsSubDirectory+"/js/[name].[chunkhash].js"       //生成
    },
    plugins: [
        new UglifyjsWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"首页",
            minify:{
                removeAttributeQuotes:true   ,//去掉属性值后的双引号
                collapseInlineTagWhitespace:true,    //折叠时不要在元素之间留下任何空格。必须与。一起使用collapseWhitespace=true
                collapseWhitespace:true,   //	折叠有助于文档树中文本节点的空白区域
                removeComments: true,    //剥离HTML评论
            },
            // inject: 'body',   //是否引入，默认引入，可不写
            hash:true,    //去除缓存
            template: "index.html",   //模板文件
            filename:backConfig.build.index  , //生成文件
        }),
        new ExtractTextWebpackPlugin({
            filename:backConfig.build.assetsSubDirectory+"/css/[name].[chunkhash].css",  //生成文件
            allChunks: true,
            publicPath:"./",
        }),
        new OptimizeCssAssetsPlugin(),
        // new MiniCssExtractPlugin({
        //     filename:backConfig.build.assetsSubDirectory+"/css/[name].css",////都提到build目录下的css目录中
        //     chunkFilename: "[id].css"
        // }),
        // new OptimizeCssAssetsPlugin(),
        new CopyWebpackPlugin([
            {
                from:path.resolve(__dirname,'./static'),
                to:backConfig.build.assetsSubDirectory,
                ignore:['.*']
            }
        ]),
        // new webpack.optimize.SplitChunksPlugin({
        //     name: 'vendor',
        //     chunks: "all",
        //     minSize: 20000,
        //     minChunks: 1,
        //     maxAsyncRequests: 5,
        //     maxInitialRequests: 3,
        // }),
        // new CompressionWebpackPlugin({
        //     asset: '[path].gz[query]',
        //     algorithm:'gzip',
        //     test: new RegExp(
        //         '\\.(' +
        //         backConfig.build.productionGzipExtensions.join('|') +
        //         ')$'
        //     ),
        //     threshold:0,//只处理比这个值大的资源。按字节计算
        //     minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
        // })
    ],
});
if(backConfig.build.productionGzip){
    buildConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset:'[path].gz[query]',
            algorithm:'gzip',
            test: new RegExp(
                '\\.(' +
                backConfig.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold:1000,//只处理比这个值大的资源。按字节计算
            minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
        })
    )
}
module.exports = buildConfig