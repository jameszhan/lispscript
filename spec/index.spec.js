var t = require("../lib/index");

describe('LispScript', function() {

    describe('interpret', function() {
        describe('quote', function() {
            it('should can be process the quote', function() {
                expect(t.interpret("(car '(1 2 3))")).toEqual(1);
                expect(t.interpret("(cdr '(1 2 3))")).toEqual([2, 3]);
                expect(t.interpret("(cdr '(cdr '(1 3 5)))")).toEqual(["'", [1, 3, 5]]);
                expect(t.interpret("(cdr '(1 2 (cdr '(3 5 7)) 9))")).toEqual([2, ['cdr', "'", [3, 5, 7]], 9]);
                expect(t.interpret("(eq (cdr '(1 2 3)) (cdr '(2 2 3)))")).toEqual(true);
                expect(t.interpret("(eq (cdr '(1 2 3)) (cdr '(2 3 3)))")).toEqual(false);
            });
        });
    });

});