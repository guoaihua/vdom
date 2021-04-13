import patch from './patch';
import createElm from './createElement';
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

    let keymap = null;

    //开始遍历,结束条件为新后小于等于新前 或者旧后小于等于新前
    while(( newStartIdx <= newEndIdx)&&( oldStartIdx <= oldEndIdx) ){
        // 跳过已经处理完的节点

        if(oldStartVnode === null || oldch[oldStartIdx] === undefined){
            oldStartVnode = oldch[++oldStartIdx];
        }else if(oldEndVnode === null || oldch[oldEndIdx] === undefined){
            oldEndVnode = oldch[--oldEndIdx];
        }else if(newStartVnode === null || newch[newStartIdx] === undefined){
            newStartVnode = newch[++newStartIdx];
        }else if(newEndVnode === null || newch[newEndIdx] === undefined){
            newEndVnode = newch[--newEndIdx];
        }else if(sameVnode(oldStartVnode, newStartVnode)){
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

        }else {
            // 都没有命中就开始以newVnode的顺序在旧的vnode查找index

            if(!keymap){
                keymap = {};
                for(let i = 0; i < oldch.length; i++){
                    let key = oldch[i].key;
                    if(key){
                        
                         // 为旧的vnode缓存key和index
                        keymap[key] = i;
                    }
                }
            }

            var idxInOld = keymap[newStartVnode.key];
            if(!idxInOld){
                // idxInOld 不存在，说明是一个全新的节点
                parent.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
            }else {
                // 如果找到了，说明是一个移动操作
                const elmToMove = oldch[idxInOld];
                patchVnode(elmToMove, newStartVnode);

                oldch[idxInOld] = undefined;
                parent.insertBefore(elmToMove.elm, oldStartVnode.elm);
            }

            // newStartVnode 节点在下移
            newStartVnode = newch[++newStartIdx];
        }
    }

    // 处理剩下的情况

    // 旧节点先处理完的，说明新节点还有需要新增的
    if(newStartIdx <= newEndIdx){
            for(let i = newStartIdx; i <=newEndIdx; i++){
                parent.insertBefore(createElm(newch[i]), oldch[oldStartIdx].elm);
         }
    }else {
        // 新节点先处理完，说明还有未删除的项
        for(let i = oldStartIdx; i <= oldEndIdx; i++){
            if(oldch[i]){
                parent.removeChild(oldch[i].elm);
            }
        }
    }
}