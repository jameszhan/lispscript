(function(exports){
    function Scope(parent, provider){
        this.parent = parent;
        this.provider = provider || {};
    }

    Scope.prototype.get = function(id){
        return this[id] || this.provider[id] || (this.parent && this.parent.get(id));
    };

    Scope.prototype.has = function(id) {
        return this.localHas(id) || (!!this.parent && this.parent.has(id));
    };

    Scope.prototype.localHas = function(id) {
        return this.hasOwnProperty(id) || this.provider.hasOwnProperty(id);
    };

    Scope.prototype.remove = function(id, recursively) {
        if (this.hasOwnProperty(id)){
            delete this[id];
        }
        if (this.provider.hasOwnProperty(id)) {
            delete this.provider[id];
        }
        if (recursively && this.parent) {
            this.parent.remove(id, recursively);
        }
        return this;
    };

    Scope.prototype.set = function(id, value){
        if (!this.localHas(id) && this.parent && this.parent.has(id)) {
            this.parent.set(id, value);
        } else {
            if (this.hasOwnProperty(id)){
                this[id] = value;
            } else {
                this.provider[id] = value;
            }
        }
        return this;
    };

    Scope.prototype.local = function(id, value) {
        this.provider[id] = value;
    };

    exports.newScope = function(parentScope, provider){
        return new Scope(parentScope, provider);
    };
})(exports);