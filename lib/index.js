var t = require("./interpret").interpreter, env = require('./env').env;

exports.interpret = function(input) {
    return t.eval(input, env);
};