'use strict';
const merge=require('webpack-merge');    //合并文件
const prodEnv=require("./prod.env");

module.exports=merge(prodEnv,{
    NODE_ENV: '"development"',
})

