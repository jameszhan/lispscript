(function(exports){
    var aps = Array.prototype.slice, toString = Object.prototype.toString;
    function isArray(value) {return toString.call(value) === '[object Array]';}
    function isFunction(value){return typeof value === 'function';}

    var lexer = function(){
        return {
            scan: scan,
            tokenize: function(input){ return tokenize(scan(input)); }
        };

        function symbol(input){
            var type = 'literal', value = input;
            if (input === '(' || input === ')') {
                type = 'keyword';
            } else if (!isNaN(parseFloat(input))) {
                value = parseFloat(input);
            } else if (input[0] === '"' && input.slice(-1) === '"') {
                value = input.slice(1, -1);
            } else {
                type = 'identifier';
            }
            return { type: type, value: value }
        }

        function scan(input) { //分离出括号，字符串及单词
            return input.split('"').map(function(x, i){
                    if (i % 2 === 0){ // not in string
                        return x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
                    } else { // in string
                        return x.replace(/\s/g, "#whitespace#");
                    }
                }).join('"').trim().split(/\s+/).map(function(x){
                    return x.replace(/#whitespace#/g, " ");
                });
        }

        function tokenize(words) {
            return words.map(function(input){ return symbol(input); });
        }
    }();

    var parser = function(){
        return {
            parse: function(tokens){ return ast(tokens, []); },
            print: function(ast){ printAST(ast, 0); }
        };

        function ast(tokens, list) {
            var token = tokens.shift();
            if (token === undefined) {
                return list.pop();
            } else if (token.value === "(") {
                list.push(ast(tokens, []));
                return ast(tokens, list);
            } else if (token.value === ")") {
                return list;
            } else {
                return ast(tokens, list.concat(token));
            }
        }

        function printAST(node, i){
            var indent = '';
            for (var j = 0; j < i; j++){
                indent += "\t";
            }
            if (isArray(node)) {
                var op = node[0];
                console.log(indent, op.value);
                node.slice(1).forEach(function(e){
                    printAST(e, i + 1);
                });
            } else {
                console.log(indent, node.value);
            }
        }
    }();

    var interpreter = function(){
        return {
            interpret: function(ast, env){
                return interpret(ast, env || { get: function(id){ return "#" + id + "#"; } });
            }
        };

        function execute(expr, scope) {
            var list = expr.map(function(e){ return interpret(e, scope); });
            if (isFunction(list[0])) {
                var ret = list[0].apply(scope, aps.call(list, 1));
                if (isArray(ret) && ret.length == 1) {
                    return ret[0];
                } else {
                    return ret;
                }
            } else {
                return list;
            }
        }

        function interpret(node, scope) {
            if (isArray(node)) {
                return execute(node, scope);
            } else if(node.type === 'identifier') {
                return scope.get(node.value);
            } else { //literal
                return node.value;
            }
        }
    }();

    exports.interpreter = {
        interpret: interpreter.interpret,
        scan: lexer.scan,
        tokenize: lexer.tokenize,
        parse: parser.parse,
        print: parser.print,
        eval: function(input, env) {
            return this.interpret(this.parse(this.tokenize(input)), env);
        }
    };

})(typeof exports === 'undefined' ? this : exports);