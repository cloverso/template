(function(){
	 /**
	 * js模板引擎
	 * @parame text(template DomString): html模板文本
	 * @parame data(dom object): 模板插入数据
	 **/
    function template(text, data) {
        // 模板匹配正则
        var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;
        //模板文本中的特殊字符转义处理
        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        var escapes = {
            "'": "'",
            '\\': '\\',
            '\r': 'r',
            '\n': 'n',
            '\t': 't',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };
        return (function (text, data) {
            //记录当前扫描位置;函数体数组初始化
            var index = 0, function_body = ["var temp = [];\n"];
            text.replace(matcher, function (match, interpolate, evaluate, offset) {
                //找到第一个匹配后，将前面部分作为普通字符串拼接的表达式，并添加处理转义字符
                function_body.push("temp.push('" + text.slice(index, offset).replace(escaper, function (match) { return '\\' + escapes[match]; }) + "');\n");
                // console.log(function_body)
                //如果是<% ... %>直接作为代码片段，evaluate就是捕获的分组
                if (evaluate) function_body.push(evaluate + '\n');
                //如果是<%= ... %>追加字符串，interpolate就是捕获的分组
                if (interpolate) function_body.push("temp.push(" + interpolate + ");\n");
                //递增index，跳过evaluate或者interpolate
                index = offset + match.length;
                //返回匹配值，当前使用场景可忽略
                return match;
            });
            //最后返回编译后的DOM代码    
            function_body.push("return temp.join('');");
            var render = new Function('data', function_body.join(''));
            return render(data);
        })(text, data);
    };
    
    this.template = template;
    
}).call(this);
