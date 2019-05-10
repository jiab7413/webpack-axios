const webpack = require('webpack')
const path =require('path')
const backConfig = require('../config')    //路径配置
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
// assetsPath = function (_path) {
//     const assetsSubDirectory = backConfig.build.assetsSubDirectory
//     return path.posix.join(assetsSubDirectory, _path)
// };
module.exports={
    mode:'development',   //模式
    context: path.resolve(__dirname, '../'),
    entry: {   //入口
        "index":"./index.js",
    },
    output: {
        path: backConfig.build.assetsRoot,   //出口的目录
        // filename:  backConfig.build.assetsSubDirectory+"/js/[name].[chunkhash].js"       //生成
        filename:  backConfig.build.assetsSubDirectory+"/js/[name].js"       //生成
    },
    resolve: {
        // 用于查找模块的目录
        extensions: ['.js','.json']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module:{            //创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
        rules: [
            {
                test:/\.js$/,       //js验证规则
                loader: "babel-loader",
                exclude: /node_modules/,  //文件需要处理
                include: [resolve('src'), resolve('test')]        //文件不需要处理
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit:100,//当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
                    outputPath:backConfig.build.assetsSubDirectory,  // 指定图片输入的文件夹
                    publicPath:"../",
                    name:"image/[name].[hash:7].[ext]",
                    // names:assetsPath('image/[name].[hash:7].[ext]')
                }
            },
            {
                test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:100,
                    outputPath:backConfig.build.assetsSubDirectory,         // 指定打包后的图片位置
                    publicPath:"../",
                    name:"media/[name].[ext]?[hash]"
                    // name:assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.html$/,  //打包html文件中的静态资源图片
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize:true,
                        root: path.resolve(__dirname, 'src'),
                    }
                }
            }
            // {
            //     test: /\.css$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,//注意这边
            //         "css-loader"
            //     ]
            // }
        ]
    },
}