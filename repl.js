var repl = require("repl");
var interpreter = require("./lib/interpret").interpreter;

repl.start({
    prompt: "> ",
    eval: function(cmd, context, filename, callback) {
        if (cmd !== "(\n)") {
            cmd = cmd.slice(1, -2); // rm parens and newline added by repl
            var ret = interpreter.eval(cmd);
            callback(null, ret);
        } else {
            callback(null);
        }
    }
});