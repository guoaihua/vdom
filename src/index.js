/*
 * @Author: ziming
 * @Date: 2021-04-07 22:27:56
 * @LastEditors: ziming
 * @LastEditTime: 2021-04-07 23:38:05
 */

import h1 from './h';
import patch from './patch';
  
 const container = document.getElementById("container");
  

  const vnode2 = h1("div", { on: { click: function(){} } }, [
    h1("span", { style: { fontWeight: "bold" } }, "This is bold"),
    h1("a", { props: { href: "/foo" } }, "I'll take you places!"),
  ]);
  // Patch into empty DOM element – sthis modifies the DOM as a side effect
  patch(container, vnode2);
  