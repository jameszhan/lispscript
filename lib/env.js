var util = require('./util');
(function(exports){
    var aps = Array.prototype.slice,
        isArray = util.isArray
        axiom = {
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
        },
        env = function() {
            var providers = [axiom];
            return {
                get: function(identifier){
                    var provider = false;
                    providers.some(function(p){
                        if (p.hasOwnProperty(identifier)) {
                            provider = p;
                            return true;
                        }
                        return false;
                    });
                    return provider && provider[identifier];
                },
                preprocess: function(ast) {
                    travel(ast, null, function(node, parent){
                        if (node.value === "'") {  //trans ' to quote
                            if (parent && isArray(parent)) {
                                for (var i = 0; i < parent.length; i++) {
                                    if (node === parent[i]) {
                                        node.value = 'quote';
                                        var tmp = parent.splice(i, 2);
                                        node.ast = tmp;
                                        parent.splice(i, 0, tmp);
                                    }
                                }
                            }
                        }
                    });
                },
                registerProvider: function(provider){
                    providers.push(provider);
                }
            };

            function travel(node, parent, func){
                if (isArray(node)) {
                    node.forEach(function(e) {
                        travel(e, node, func);
                    });
                } else {
                    func(node, parent);
                }
            }
        }();

    exports.env = env;
})(exports);



