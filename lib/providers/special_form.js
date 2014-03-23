(function(exports){
    var util = require('../util'),
        newScope = require('../scope').newScope,
        some = Array.prototype.some,
        aps = Array.prototype.slice;

    exports.provider = {
        quote: function(s){
            var interpret = this.interpret, scope = this.scope;
            return util.listAst(s);
        },

        define: function(id, val){
            var interpret = this.interpret, scope = this.scope;
            if (id && val) {
                if (util.isArray(id)) {
                    var params = aps.call(id, 1).map(function(node){ return node.value; });
                    scope.local(id[0].value, function(){
                        var args = arguments,
                            bindings = params.reduce(function(ctx, p, i) {
                                ctx[p] = args[i];
                                return ctx;
                            }, {});
                        return interpret(val, newScope(scope, bindings));
                    });
                } else {
                    scope.local(id.value, interpret(val, scope));
                }
            }
            return scope.provider;
        },

        let: function(args, body) {
            var interpret = this.interpret, scope = this.scope;
            var letContext = args.reduce(function(acc, x) {
                acc.local([x[0].value], interpret(x[1], scope));
                return acc;
            }, newScope(scope, {}));

            return interpret(body, letContext);
        },

        /**
         * Lexical Scope
         * (((lambda (x) (lambda (y) (- y x))) 2) 5) => 3
         *
         * @param args
         * @param body
         * @returns {Function}
         */
        lambda: function(args, body) {
            var interpret = this.interpret, scope = this.scope;
            return function() {
                var lambdaArguments = arguments;
                var argumentBindings = args.reduce(function(ctx, x, i) {
                    ctx[x.value] = lambdaArguments[i];
                    return ctx;
                }, {});
                var x = interpret(body, newScope(scope, argumentBindings));
                return x;
            };
        },

        if: function(predicate, conseq, alt) {
            var interpret = this.interpret, scope = this.scope;
            return interpret(predicate, scope) ?
                interpret(conseq, scope) :
                interpret(alt, scope);
        },

        cond: function() {
            var interpret = this.interpret, scope = this.scope, args = arguments, ret = undefined;
            some.call(args, function(arg){
                var predicate = interpret(arg[0], scope);
                if (predicate) {
                    if (arg[1]) {
                        ret = interpret(arg[1], scope);
                    } else {
                        ret = predicate;
                    }
                    return true;
                }
                return false;
            });
            return ret;
        }
    };

})(exports);