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

  var templates = `
    <ul>
        {{#arr}}
            <li>我的{{thing}}</li>
            {{#sports}}
                <li>adad</li>
            {{/sports}}
            <li>我的{{adsa}}</li>
            <li>我的{{ada}}</li>
        {{/arr}}
    </ul>
  `
  console.log(parseTemplateToTokens(templates));

