/*
 * @Author: ziming
 * @Date: 2021-04-08 21:57:09
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-11 18:15:04
 */
//  将节点上树
// 判断旧节点是否是一个vnode，如果不是则包装它为一个vnode
// 判断新旧节点是否是同一个，sanmeVnode， 通过sel选择器属性和key来判断
    // 如果不是则创建新的dom节点，将新的dom节点插入到旧的之前，之后删除旧的

 import vnode from './vnode';
 import createEle from './createElement';
 import patchVnode from './patchVnode';

export default function(oldVnode, newVnode){
    if(!oldVnode.sel){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {},[], oldVnode.innerText, oldVnode);
    }

    if(oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key){
        // 开始精细化比较
        // 先判断新元素是否有text属性，有则会直接覆盖
        console.log("新旧节点是同一个节点");
        patchVnode(oldVnode, newVnode);
    }else {
        // 创建新节点
        var newVnodeEle = createEle(newVnode);
        oldVnode.elm.parentNode.insertBefore(newVnodeEle,oldVnode.elm);
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }

}