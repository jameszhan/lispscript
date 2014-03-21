(function(exports){

    exports.provider = {
        print: function(v){
            console.log(v);
            return v;
        },
        trace: function(){
            console.log(this);
        }
    };

})(exports);