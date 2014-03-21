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

    describe('lambdas', function() {
        it('should return correct result when invoke lambda w no params', function() {
            expect(t.interpret("((lambda () (rest (1 2))))")).toEqual([2]);
        });

        it('should return correct result for lambda that takes and returns arg', function() {
            expect(t.interpret("((lambda (x) x) 1)")).toEqual(1);
        });

        it('should return correct result for lambda that returns list of vars', function() {
            expect(t.interpret("((lambda (x y) (x y)) 1 2)")).toEqual([1, 2]);
        });

        it('should get correct result for lambda that returns list of lits + vars', function() {
            expect(t.interpret("((lambda (x y) (0 x y)) 1 2)")).toEqual([0, 1, 2]);
        });

        it('should return correct result when invoke lambda w params', function() {
            expect(t.interpret("((lambda (x) (first (x))) 1)")).toEqual(1);
        });

        it('should return correct result when invoke nested lambdas', function() {
            expect(t.interpret("((((lambda (z) (lambda (y) (lambda (x) (- x y z)))) 2) 8) 15)")).toEqual(5);
        });
    });

    describe('let', function() {
        it('should eval inner expression w names bound', function() {
            expect(t.interpret("(let ((x 1) (y 2)) (x y))")).toEqual([1, 2]);
        });

        it('should not expose parallel bindings to each other', function() {
            // Expecting undefined for y to be consistent with normal
            // identifier resolution in littleLisp.
            expect(t.interpret("(let ((x 1) (y x)) (x y))")).toEqual([1, undefined]);
        });

        it('should accept empty binding list', function() {
            expect(t.interpret("(let () 42)")).toEqual(42);
        });
    });

    describe('if', function() {
        it('should choose the right branch', function() {
            expect(t.interpret("(if 1 42 4711)")).toEqual(42);
            expect(t.interpret("(if 0 42 4711)")).toEqual(4711);
        });
    });

});