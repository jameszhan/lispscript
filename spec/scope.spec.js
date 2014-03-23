var newScope = require("../lib/scope").newScope;

describe('LispScript', function() {

    describe('scope', function() {
        it('set and get value', function() {
            var scope1 = newScope(undefined, {a: 1}), provider = {b: 2}, scope2 = newScope(scope1, provider);
            expect(scope2.get('a')).toBe(1);
            scope2.set('a', 2);
            expect(scope2.get('a')).toBe(2);
            expect(scope1.get('a')).toBe(2);

            expect(scope2.get('b')).toBe(2);
            expect(scope1.get('b')).toBe(undefined);
            scope2.set('b', 3);
            expect(scope2.get('b')).toBe(3);
            expect(scope1.get('b')).toBe(undefined);

            scope1.set('b', 5);
            expect(scope2.get('b')).toBe(3);
            expect(scope1.get('b')).toBe(5);


            scope2.local('a', 6);
            expect(scope2.get('a')).toBe(6);
            expect(scope1.get('a')).toBe(2);
            scope2.set('a', 8);
            expect(scope2.get('a')).toBe(8);
            expect(scope1.get('a')).toBe(2);

            scope2.remove('a');
            scope2.set('a', 9);
            expect(scope2.get('a')).toBe(9);
            expect(scope1.get('a')).toBe(9);
        });
    });

});