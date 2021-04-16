/* var templatestr = `
    <ul>
        {{#stooges}}
            <li>{{name}}</li>
        {{/stooges}}
    </ul>
`;

var data = {
    "stooges": [
      { "name": "Moe" },
      { "name": "Larry" },
      { "name": "Curly" }
    ]
  };

  
  var str = Mustache.render(templatestr, {});

  var container = document.getElementById("container");
  container.innerHTML = str


  var templatestr1 = "我是一个{{worker}}, 我今年{{old}}岁，我来自{{univercity}}";

  var data = {
      worker: "学生",
      old: 25,
      univercity: "武汉**大学"
  }
  function renderTemplate(template, data){
    return template.replace(/\{\{(\w+)\}\}/g, function(findstr, $1){
        console.log(findstr, $1);
        return data[$1]
    });
  }

  console.log(renderTemplate(templatestr1, data)); */

  import parseTemplateToTokens from './parseTemplateToTokens';
  import lookup from "./lookup";
  import renderTemplate from './renderTemplate';


  var templates = `
    <ul>
        {{#arr}}
            <li>我的{{thing}}</li>
            <li>我的{{a}}</li>
            {{#books}}
                <p>{{a}}</p>
                <p>{{b}}</p>
                <p>{{c}}</p>
            {{/books}}
            <li>我的{{b}}</li>
        {{/arr}}
        <li>结束<li>
        <li>{{mode}}</li>
    </ul>
  `

  var obj = {
    arr: [
        {
            thing: "手机",
            a: 'ahaha',
            books: [
                {
                    a: "a123",
                    b: 'b11221',
                    c: "cadad"
                }
            ],
            b: 'adad'
        },
        {
            thing: "adada",
            a: 'ahaha',
            books: [
                {
                    a: "a123",
                    b: 'b11221',
                    c: "cadad"
                }
            ],
            b: 'adad'
        }
    ],
    mode: "dada"
  }

  var tokens = parseTemplateToTokens(templates);

  var domstr = renderTemplate(tokens, obj);

console.log(domstr);
document.body.innerHTML = domstr;

