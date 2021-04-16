// 通过 “a.b.c” 查找对象中的属性
export default function lookup(obj, props){
    if((props.indexOf(".") > -1) && props !== "." ){
        var keys = props.split(".");
/*         var tempObj = obj;
        for(var i = 0; i < keys.length; i++){
            tempObj = tempObj[keys[i]]
        } */
       var tempObj =  keys.reduce(function(pre,cur){
            return pre[cur]
        }, obj)
        return tempObj;
    }

    // 不是·语法直接返回
    return obj[props]
}