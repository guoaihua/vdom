// 将tokens结合数据渲染成dom
import parseArray from './parseArray';
import lookup from './lookup';
export default function renderTemplate(tokens, data) {
    var domstr = "";
    // 遍历tokens；

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if(token[0] === 'text'){
            domstr += token[1];
        }else if(token[0] === 'name'){
            domstr += data[token[1]]
        }else{
            // 处理数组
            domstr += parseArray(token[2], lookup(data, token[1]));
        }
        
    }
    return domstr
}