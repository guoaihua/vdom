
import patchChildren from "./patchChildren";
export default function patchVnode(oldVnode, newVnode){
    if(oldVnode === newVnode) return;

    if(newVnode.text && newVnode.children.length === 0){
        // 新节点无children属性，无论旧节点是否有children，那么直接覆盖旧节点（文字可以覆盖元素）
        oldVnode.elm.innerText = newVnode.text;
    }else {
        // 新节点有children， 就要判断旧节点有无children

        if(oldVnode.text || oldVnode.children.length === 0){
         // 旧没有children属性，删除旧的节点，插入新节点的children
            oldVnode.elm.innerText = '';
            // 遍历获取新节点的children结果, 并append到旧节点上
            for(var i = 0; i < newVnode.children.length; i++){
                var newVnodeEle = createEle(newVnode);
                oldVnode.elm.appendChild(newVnodeEle);
            }
        }else {
            // 都有children， 就要开始更精细化的比较
            patchChildren(oldVnode.elm, oldVnode.children, newVnode.children);
        }
    }
}