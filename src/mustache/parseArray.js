
import renderTemplate from './renderTemplate';
export default function parseArray(token, data) {
    console.log(token, data);
    // 这个token也是一个单独token
    // 循环的次数看data
    var domstr = '';
    for (let i = 0; i < data.length; i++) {
        domstr +=  renderTemplate(token, data[i]);
    }
    return domstr;
}