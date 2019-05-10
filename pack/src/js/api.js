/**
 * 引入单独的方法
 * import { GETMETHOD, POSTMETHOD } from './enclosure_method'
 */
/**
 * 整体引入
 * import req from './enclosure_method'
 */
/**
 * api请求封装
 */
import req from './enclosure_method'
import URL from './path'
export default {
    getLoginData(username,password) {
        return req.GETMETHOD( URL.LOGINURL, {username,password})
    }
}