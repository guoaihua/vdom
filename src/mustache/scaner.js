export default class Scanner {
    constructor(templatestr){
        this.templatestr = templatestr;
        this.pos = 0; // 记录当前扫描器指针的位置
        this.tail = templatestr; // 记录剩余的模板长度
    }

    scanUntil(tag){
        // 扫描字符串模板，直到遇到了tag,返回遍历过的模板
        // 当剩余的首部不是tag，并且剩余长度不为0时循环遍历
        var startOps = this.pos;
        while( (this.tail.length !== 0) && (this.tail.indexOf(tag) !== 0)){
            this.pos++;
            this.tail = this.templatestr.substr(this.pos);
        }
        return this.templatestr.substr(startOps, this.pos-startOps);
    }

    scan(tag){
        // 跳过指定的字符
        if( (this.tail.length !== 0) && (this.tail.indexOf(tag) === 0)){
            this.pos+=tag.length;
            this.tail = this.templatestr.substr(this.pos);
        }
    }
    eocs(){
        return this.templatestr.length === this.pos;
    }
}