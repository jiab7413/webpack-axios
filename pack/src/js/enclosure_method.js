/**
 * post以及get方法的封装
 */
import request from './request'
/**
 * 单独导出方法
 */
// export function GETMETHOD(url,param){
//     return new Promise((resolve, reject)=>{
//         request({
//             url:url,
//             method:'GET',
//             params:param
//         }).then((res) => {
//             resolve(res)
//         }).catch((error) => {
//             reject(error)
//         })
//     })
// }
// export function POSTMETHOD(url, param) {
//     return new Promise((resolve, reject) => {
//         request({
//             url:url,
//             method:'POST',
//             params:param
//         }).then((res)=> {
//             resolve(res)
//         }).then((error)=> {
//             reject(error)
//         })
//     })
// }
/**
 * 整体导出
 */
export default {
    GETMETHOD(url,param){
        return new Promise((resolve, reject)=>{
            request({
                url:url,
                method:'GET',
                params:param
            }).then((res) => {
                resolve(res)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    POSTMETHOD(url, param) {
        return new Promise((resolve, reject) => {
            debugger
            request({
                url: url,
                method: 'POST',
                params: param
            }).then((res) => {
                resolve(res)
            }).then((error) => {
                reject(error)
            })
        })
    }
}
