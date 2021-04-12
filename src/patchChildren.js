import patch from './patch';
import patchVnode from './patchVnode';

function sameVnode(oldVnode, newVnode){
    return oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key;
}

export default function patchChildren(parent, oldch, newch){
    //创建四个指针

    // 新前
    var newStartIdx = 0;
    var newStartVnode = newch[newStartIdx];

    // 新后
    var newEndIdx = newch.length - 1;
    var newEndVnode = newch[newEndIdx];

    // 旧前
    var oldStartIdx = 0;
    var oldStartVnode = oldch[oldStartIdx];

    // 旧后
    var oldEndIdx = oldch.length - 1;
    var oldEndVnode = oldch[oldEndIdx];

    var count = 0;
    //开始遍历,结束条件为新后小于等于新前 或者旧后小于等于新前
    while((( newStartIdx <= newEndIdx)|| ( oldStartIdx <= oldEndIdx) )&& count<20 ){
        if(sameVnode(oldStartVnode, newStartVnode)){
            console.log("@1 命中新前与旧前");
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldch[++oldStartIdx];
            newStartVnode = newch[++newStartIdx];
        }else if(sameVnode(oldEndVnode, newEndVnode)) {
            console.log("@2 命中新后与旧后");
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldch[--oldEndIdx];
            newEndVnode = newch[--newEndIdx];
        }else if(sameVnode(oldStartVnode, newEndVnode)){
            console.log("@3 命中新后与旧前");
            patchVnode(oldStartVnode, newEndVnode);

            // 移动old节点到旧后之后
            parent.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldch[++oldStartIdx];
            newEndVnode = newch[--newEndIdx];

        }else if(sameVnode(oldEndVnode, newStartVnode)){
            console.log("@4 命中新前与旧后");
            patchVnode(oldEndVnode, newStartVnode);

            // 移动old节点到旧前之前
            parent.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldch[--oldEndIdx];
            newStartVnode = newch[++newStartIdx];

        }

        count++;
    }
}