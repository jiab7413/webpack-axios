/**
 * 拦截的封装
 */
import axios from 'axios'
import { GETTOKEN } from './token'

const instance = axios.create({
    timeout:15000,
    // baseURL:'http://localhost:9005'
});

//请求拦截
instance.interceptors.request.use(
    config => {
        debugger
        if(GETTOKEN()){
            config.headers = {
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': GETTOKEN()
            };
        }
        return config
    },error =>{
        Promise.reject(error)
    }
);

//响应拦截
instance.interceptors.response.use(
    (response) => {
        debugger
        if (response.data && response.data.code && response.data.code !== 200) {
            Promise.reject(error)
        }
        return response
    }, (error) => {
        return Promise.reject(error)
    }
);

export default instance