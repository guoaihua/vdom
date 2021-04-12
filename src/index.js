/*
 * @Author: ziming
 * @Date: 2021-04-07 22:27:56
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-11 17:55:16
 */

import h1 from './h';
import patch from './patch';
  
 const container = document.getElementById("container");
  


  const vnode1 = h1('div', {}, "这是一个只有text属性的新节点");

  // 新节点有children的情况
  const vnode2 =  h1('ul',{}, [
    h1('li', {key:"aa"}, "a"),
    h1('li', {key: "b"}, "b"),
    h1('li', {key: "c"}, "c")
  ])
  // Patch into empty DOM element – sthis modifies the DOM as a side effect
  patch(container, vnode2);

  const vnode3 =  h1('ul',{}, [
    h1('li', {key: "c"}, "c"),
    h1('li', {key:"a"}, "aa"),
    h1('li', {key: "b"}, "bb"),
    h1('li', {key: "ca"}, "cc")
  ]);

  patch(vnode2,vnode3);
  