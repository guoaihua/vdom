
import Scaner from './scaner';
export default function parseTemplateToTokens(templates){
    var scan = new Scaner(templates);
    var words;
    var tokens = [];

    while(!scan.eocs()){
      words = scan.scanUntil("{{");
      if(words !== ''){
        tokens.push(["text", words]);
      }
      // 跳过
      scan.scan("{{");
      words = scan.scanUntil("}}");
      // 收集{{ }}之间的词
      if(words !== ''){
            if(words[0] === '#'){
                tokens.push(["#", words.substr(1)]);
            }else if(words[0] === '/'){
                tokens.push(["/", words.substr(1)]);
            }else {
                tokens.push(["name", words]);
            }
      }
      scan.scan("}}");
    }

    return tokens;
}