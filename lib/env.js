(function(exports){
    var util = require('./util'),
        newScope = require('./scope').newScope,
        specialForm = require('./providers/special_form').provider,
        isArray = util.isArray;
    var rootScope = newScope(undefined, specialForm);

    var systemScope = ['./providers/axiom', './providers/arithmetic', './providers/system'].reduce(function(parent, providerPath){
        var provider = require(providerPath).provider;
        return newScope(parent, provider);
    }, rootScope);

    var aliases = [
        ['first', 'car'],
        ['rest', 'cdr']
    ];

    var aliasScope = newScope(systemScope, aliases.reduce(function(ctx, alias){
        ctx[alias[0]] = systemScope.get(alias[1]);
        return ctx;
    }, {}));

    var defaultScope = newScope(aliasScope, {});
    defaultScope.preprocess = function(){
        function travel(node, parent, func){
            if (isArray(node)) {
                node.forEach(function(e) {
                    travel(e, node, func);
                });
            } else {
                func(node, parent);
            }
        }
        return function(ast){
            travel(ast, null, function(node, parent){
                if (node.value === "'") {  //trans ' to quote
                    if (parent && isArray(parent)) {
                        for (var i = 0; i < parent.length; i++) {
                            if (node === parent[i]) {
                                node.value = 'quote';
                                node.type = 'special-form';
                                var tmp = parent.splice(i, 2);
                                node.ast = tmp;
                                parent.splice(i, 0, tmp);
                            }
                        }
                    }
                } else if (specialForm[node.value]) {
                    node.type = 'special-form';
                }
            });
        }
    }();

    exports.env = defaultScope;

})(exports);



