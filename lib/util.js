(function(exports){
    var toString = Object.prototype.toString;

    function isArray(value) { return toString.call(value) === '[object Array]'; }
    function isFunction(value){ return typeof value === 'function'; }

    function mapAst(node, func){
        if (isArray(node)) {
            var list = [];
            node.forEach(function(e){
                list.push(simplify(e));
            });
            return list;
        } else {
            return func(node);
        }
    }

    exports.isArray = isArray;
    exports.isFunction = isFunction;
    exports.listAst = function(ast){
        return mapAst(ast, function(node){ return node.value; });
    };
})(exports);