(function(exports){
    var util = require('../util'),
        aps = Array.prototype.slice;

    exports.provider = {
        quote: function(args){
            return util.listAst(args);
        },
        atom: function(s){

        },
        eq: function(x, y){
            return util.equals(x, y);
        },
        car: function(cons){
            return cons[0];
        },
        cdr: function(cons) {
            return aps.call(cons, 1);
        },
        cons: function(a, s){
            return [a].concat(s);
        },
        cond: function(expr){

        }
    };

})(exports);