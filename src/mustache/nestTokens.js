export default function nestTokens(tokens){
    //结果数组
    var nestTokens = [];
    // 借用栈结构，保存每一次往下遍历的小tokens集合
    var sections = [];
    // 利用collector收集每一个嵌套结构的数据
    var collector = nestTokens; // 一开始指向的是最初的数组

    for(var i = 0; i < tokens.length; i++){
        var token = tokens[i]
        switch(token[0]){
            case '#':
                // 遇到#代表，需要创建一个新的数组里面了
                // 当前tokens入栈
                collector.push(token)

                sections.push(token);
                // 切换收集器到当前tokens为2的一项
                collector = token[2] = [];
                break;
            case '/':
                // 遇到/ 出栈
                sections.pop();
                // 收集器返回到上一层, 指向最后一个tokens 的数组第二项
                // 引用
                collector = sections.length > 0 ? sections[sections.length - 1][2] : nestTokens;
                break;
            default:
                // 当前collector永远指向最新的数组
                // 借助应用类型，永远指向最新的嵌套数组
                collector.push(token);
        }
    }
    return nestTokens;
}