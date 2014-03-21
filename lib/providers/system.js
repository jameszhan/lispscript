(function(exports){

    exports.provider = {
        print: function(v){
            console.log(v);
            return v;
        },
        trace: function(){
            console.log(this);
        },

        apply: function(op, list){
            return op.apply(this, list);
        }
    };

})(exports);