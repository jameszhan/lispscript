(function(exports){
    function Scope(parent, provider){
        this.parent = parent;
        this.provider = provider || {};
    }

    Scope.prototype.get = function(id){
        return this[id] || this.provider[id] || (this.parent && this.parent.get(id));
    };

    Scope.prototype.set = function(id, value){
        if (this.get(id) === undefined) {
            this.provider[id] = value;
        } else {
            if (this.hasOwnProperty(id)){
                this[id] = value;
            } else if (this.provider.hasOwnProperty(id)) {
                this.provider[id] = value;
            } else {
                this.parent.set(id, value);
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