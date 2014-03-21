(function(exports){
    var util = require('../util'),
        newScope = require('../scope').newScope;

    exports.provider = {
        define: function(id, val){
            if (id && val) {
                this.scope.local(id.value, this.interpret(val, this.scope));
            }
            return this.scope;
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
                return interpret(body, newScope(scope, argumentBindings));
            };
        },

        if: function(predicate, conseq, alt) {
            var interpret = this.interpret, scope = this.scope;
            return interpret(predicate, scope) ?
                interpret(conseq, scope) :
                interpret(alt, scope);
        }
    };

})(exports);