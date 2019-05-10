/**
 * 数据返回
 */
import reqApi from './api'

reqApi.getLoginData("李四", 'Ad12345678').then((res)=>{
    console.log(res)
})