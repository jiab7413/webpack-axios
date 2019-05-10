/**
 * token的封装
 */
import cookie from 'js-cookie'


const LOGINTOKEN = 'USERTOKEN'

export  function GETTOKEN(){
    cookie.get(LOGINTOKEN)
}

export function SETTOKEN(val,time) {
    cookie.set(LOGINTOKEN,val, { expires: time });
}

export function REMOVETOKEN() {
    cookie.remove(LOGINTOKEN)
}