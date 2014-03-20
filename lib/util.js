(function(exports){
    var toString = Object.prototype.toString;

    function isArray(value) { return toString.call(value) === '[object Array]'; }
    function isFunction(value){ return typeof value === 'function'; }
    function equals(x, y) {
        if (isArray(x) && isArray(y) && x.length == y.length) {
            for (var i = 0; i < x.length; i++) {
                if (x[i] != y[i]) {
                    return false;
                }
            }
            return true;
        } else {
            return x == y;
        }
    }

    function mapAst(node, func){
        if (isArray(node)) {
            var list = [];
            node.forEach(function(e){
                list.push(mapAst(e, func));
            });
            return list;
        } else {
            return func(node);
        }
    }

    function toS(node) {
        if (isArray(node)) {
            var str = '(';
            node.forEach(function(e){
                str += toS(e);
            });
            str += ')'
            return str;
        } else {
            var suffix = ' ';
            return node.value + suffix;
        }
    }

    exports.isArray = isArray;
    exports.isFunction = isFunction;
    exports.listAst = function(ast){
        return mapAst(ast, function(node){ return node.value; });
    };
    exports.equals = equals;
    exports.toS = toS;
})(exports);