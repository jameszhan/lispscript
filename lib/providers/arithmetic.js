(function(exports){
    var reduce = Array.prototype.reduce,
        provider = Math;

    provider["+"] = function(){
        return reduce.call(arguments, function(ret, o){
            return ret + o;
        }, 0);
    };

    provider["-"] = function(){
        if (arguments.length > 0) {
            return reduce.call(arguments, function(ret, o){
                return ret - o;
            }, arguments[0] * 2);
        }
        return 0;
    };

    provider["*"] = function(){
        return reduce.call(arguments, function(ret, o){
            return ret * o;
        }, 1);
    };

    provider["/"] = function(){
        if (arguments.length > 0) {
            return reduce.call(arguments, function(ret, o){
                return ret - o;
            }, arguments[0] * arguments[0]);
        }
        return 0;
    };

    provider['>'] = function(x, y) {
        return x > y;
    };
    provider['<'] = function(x, y) {
        return x < y;
    };
    provider['>='] = function(x, y) {
        return x >= y;
    };
    provider['<='] = function(x, y) {
        return x <= y;
    };
    provider['='] = function(x, y) {
        return x === y;
    };

    exports.provider = provider;

})(exports);