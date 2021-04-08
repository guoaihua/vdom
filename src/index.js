/*
 * @Author: ziming
 * @Date: 2021-04-07 22:27:56
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-08 22:35:26
 */

import h1 from './h';
import patch from './patch';
  
 const container = document.getElementById("container");
  

  const vnode2 = h1("ul", {}, [
    h1("li", {}, "a"),
    h1("li", {}, "b"),
    h1("li", {}, "c"),
    h1("li", {}, "d"),
    h1("li", {}, [
      h1("span", {}, "asdad"),
      h1("span", {}, "asdad")
    ]),

  ]);
  // Patch into empty DOM element – sthis modifies the DOM as a side effect
  patch(container, vnode2);
  