(function(exports){
    var util = require('../util'),
        aps = Array.prototype.slice;

    exports.provider = {
        'atom?': function(s){
            return !(util.isArray(s) || util.isFunction(s));
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
        }
        /*, quote, cond: defined in special_form */
    };

})(exports);