var axiom = {
    quote: function(){
        return aps.call(arguments);
    },
    atom: function(s){

    },
    eq: function(x, y){
        return x === y;
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

var env = function(scope, parent) {
    return {
        get: function(identifier){
            if (axiom.hasOwnProperty(identifier)){
                return axiom[identifier];
            } else if (scope && scope.hasOwnProperty(identifier)) {
                return scope[identifier];
            } else if (parent !== undefined) {
                return parent[identifier];
            } else {
                return undefined;
            }
        }
    };
};

var env = {
    providers: [],
    get: function(id){
        if (this.hasOwnProperty(id)) {
            return this[id];
        }
        this.providers.forEach(function(provider){
            if (provider.hasOwnProperty(id)) {
                return provider[id];
            }
        });
        return "#" + id + "#";
    },
    registerProvider: function(provider){
        this.providers.push(provider);
    }
};