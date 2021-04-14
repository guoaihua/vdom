/*
 * @Author: ziming
 * @Date: 2021-04-07 22:36:23
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-11 17:51:52
 */
import vnode  from './vnode.js';

export default function(sel, b, c){
    if(arguments.length !== 3){
        throw new Error("只能接受3个参数");
    }

    // 判断第三个参数
    // h('div', {}, [])
    // h('div', {}, '1231')
    // h('div', {}, h('span',{},"adad"))

    if(typeof c === "string"){
        return vnode(sel, b, [],c, undefined);
    }
    if(Object.prototype.toString.call(c) === '[object Object]'){
        return vnode(sel,b, [c], undefined, undefined);
    }

    if(Object.prototype.toString.call(c) === '[object Array]'){
       var children = [];
       for(var i = 0; i < c.length; i++){
            children.push(c[i]);
       }
       return vnode(sel,b, children, undefined, undefined);
    }

    throw new Error("第三个参数传递不正确");

}