# template
简易 JavaScrpt DOM 模板引擎

使用方法：
<script src="xxxx/template.js"></script>
<script id="ul-template" type="text/template">
<pre>
  <% data.forEach(funcntion(item){ %>
  <li><%= item.text %></li>
  <% }) %>
</pre>
</script>

<script>
<pre>
    var ulData = [
      {
        className: 'class1',
        text: 'text1'
      },
      {
        className: 'class2',
        text: 'text2'
      },
      {
        className: 'class3',
        text: 'text3'
      }
    ];
    var ul = document.getElementById('ul'),
        ulTemplate = document.getElementById('ul-template');
    ul.innterHTML = template(ulTemplate.innerHTML, ulData);
</pre>
</script>
