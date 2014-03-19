var repl = require("repl");
var t = require("./lib/index");

repl.start({
    prompt: "> ",
    eval: function(cmd, context, filename, callback) {
        if (cmd !== "(\n)") {
            cmd = cmd.slice(1, -2); // rm parens and newline added by repl
            var ret = t.interpret(cmd);
            callback(null, ret);
        } else {
            callback(null);
        }
    }
});