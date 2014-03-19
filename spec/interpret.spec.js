var t = require('../lib/interpret').interpreter;

function isArray(value) {return toString.call(value) === '[object Array]';}

var aps = Array.prototype.slice, toString = Object.prototype.toString;

function simplify(node){
    if (isArray(node)) {
        var list = [];
        node.forEach(function(e){
            list.push(simplify(e));
        });
        return list;
    } else {
        return node.value;
    }
}

describe('LispScript', function() {
    describe('lexer', function() {
        it('should lex a single atom', function() {
            expect(t.scan("a")).toEqual(["a"]);
            expect(t.tokenize("a")[0].value).toEqual("a");
        });
        it('should lex an atom in a list', function() {
            expect(t.tokenize("()").length).toEqual(2);
            expect(t.tokenize("()")[0].value).toEqual('(');
            expect(t.tokenize("()")[1].value).toEqual(')');
        });
    });

    describe('parser', function(){
        it('should parse a single atom', function() {
            expect(t.parse(t.tokenize('"a"')).value).toEqual("a");
            expect(t.parse(t.tokenize('"a"')).type).toEqual("literal");
        });

        it('should lex an atom in a list', function() {
            expect(t.parse(t.tokenize("()"))).toEqual([]);
        });

        it('should lex multi atom list', function() {
            expect(simplify(t.parse(t.tokenize("(hi you)")))).toEqual(["hi", "you"]);
        });

        it('should lex list containing list', function() {
            expect(simplify(t.parse(t.tokenize("((x))")))).toEqual([['x']]);
        });

        it('should lex list containing list', function() {
            expect(simplify(t.parse(t.tokenize("(x (y) z)")))).toEqual(["x", ["y"], "z"]);
        });

        it('should lex list containing list', function() {
            expect(simplify(t.parse(t.tokenize("(x (y) (a b c))")))).toEqual(["x", ["y"], ["a", "b", "c"]]);
        });

        describe('atoms', function() {
            it('should parse out numbers', function() {
                expect(simplify(t.parse(t.tokenize("(1 (a 2))")))).toEqual([1, ["a", 2]]);
            });
        });

        describe('print', function(){
            it('should print the syntax tree', function(){
                console.log();
                t.print(t.parse(t.tokenize('(car (cdr 1 2) 1 (+ 1 3) 2)')));
                console.log();
                t.print(t.parse(t.tokenize("(car '(1 2 3))")));
            });
        });
    });

    describe('interpret', function() {
        var env = function(){
            return {
                get: function(id){
                    if (this.hasOwnProperty(id)) {
                        return this[id];
                    }
                    return '#' + id + '#';
                },
                put: function(id, value) {
                    this[id] = value;
                }
            }
        }();
        function interpret(input){
            return t.eval(input, env);
        }
        describe('lists', function() {
            it('should return empty list', function() {
                expect(interpret('()')).toEqual([]);
            });

            it('should return list of strings', function() {
                expect(interpret('("hi" "mary" "rose")')).toEqual(['hi', "mary", "rose"]);
            });

            it('should return list of numbers', function() {
                expect(interpret('(1 2 3)')).toEqual([1, 2, 3]);
            });

            it('should return list of numbers in strings as strings', function() {
                expect(interpret('("1" "2" "3")')).toEqual(["1", "2", "3"]);
            });
        });

        describe('atoms', function() {
            it('should return string atom', function() {
                expect(interpret('"a"')).toEqual("a");
            });

            it('should return string with space atom', function() {
                expect(interpret('"a b"')).toEqual("a b");
            });

            it('should return string with opening paren', function() {
                expect(interpret('"(a"')).toEqual("(a");
            });

            it('should return string with closing paren', function() {
                expect(interpret('")a"')).toEqual(")a");
            });

            it('should return string with parens', function() {
                expect(interpret('"(a)"')).toEqual("(a)");
            });

            it('should return number atom', function() {
                expect(interpret('123')).toEqual(123);
            });
        });

        describe('invocation', function() {
            it('should run print on an int', function() {
                env.put('print', function(value){
                    return value;
                });
                expect(interpret("(print 1)")).toEqual(1);
            });

            it('should return first element of list', function() {
                env.put('car', function(cons){
                    console.log(this);
                    return cons[0];
                });
                expect(interpret("(car (1 2 3))")).toEqual(1);
            });

            it('should return rest of list', function() {
                env.put('cdr', function(cons) {
                    return aps.call(cons, 1);
                });
                expect(interpret("(cdr (1 2 3))")).toEqual([2, 3]);
            });

            it('should return sum of list', function() {
                env.put('+', function() {
                    var sum = 0;
                    for (var i = 0; i < arguments.length; i++) {
                        sum += arguments[i];
                    }
                    return sum;
                });
                expect(interpret("(+ 1 2 3)")).toEqual(6);
            });
        });

        describe('macro', function() {
            it('should can be process the macro', function() {
                //TODO
            });
        });
    });

});
