/*
 * @Author: ziming
 * @Date: 2021-04-08 22:11:37
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-11 17:47:52
 */

import h from "./h";

// 通过虚拟节点，创建一个dom节点
//sel, data, children, text, elm
// h('ul',{},[
//    h('li',{}, "adad")
//    h('li',{}, "sss")
// ]);
export default function createEle(vnode){
    // 首先处理最简单的节点
    // 创建dom元素
    var vdom = document.createElement(vnode.sel);
    if(vnode.text || vnode.children.length === 0){
        vdom.innerText = vnode.text;
    }else if(Array.isArray(vnode.children)){
        // 处理是数组的情况
        // vdom节点是这些节点的父级，递归遍历子节点
        for(var i = 0; i < vnode.children.length;i++){
            var chlElm = createEle(vnode.children[i]);
            vdom.appendChild(chlElm);
        }
    }
    vnode.elm = vdom; 
    return vnode.elm;
}