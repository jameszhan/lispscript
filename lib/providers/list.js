(function(exports){
    var ap = Array.prototype, provider = Object.getOwnPropertyNames(ap).reduce(function(ctx, name){
        if (ap.hasOwnProperty(name)) {
            ctx[name] = function(func, list, args){
                return ap[name].call(list, func, args);
            };
        }
        return ctx;
    }, {});

    exports.provider = provider;

})(exports);