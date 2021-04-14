/*
 * @Author: ziming
 * @Date: 2021-04-07 22:28:36
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-07 22:29:59
 */
export default function(sel, data, children, text, elm){
    var key = data.key;
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}