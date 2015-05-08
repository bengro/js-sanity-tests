(function () {
    'use strict';

    describe('call & apply', function () {

        it('invokes a method', function () {
            function sayHello() {
                return "hello";
            }
            expect(sayHello()).toBe("hello");
            expect(sayHello.call()).toBe("hello");
            expect(sayHello.apply()).toBe("hello");
        });

        it('invokes a method with different params', function () {
            function sayGoodbye(name) {
                return 'bye ' + name;
            }
            expect(sayGoodbye('user')).toBe('bye user');
            expect(sayGoodbye.call(undefined, 'user')).toBe("bye user");
            expect(sayGoodbye.apply(undefined, ['user'])).toBe("bye user");
        });

        it('invokes a method with customized this', function () {
            var sayName = function sayName() {
                return this.name;
            };

            var context = {
                name: 'value'
            };
            expect(sayName.call(context)).toBe("value");
            expect(sayName.apply(context)).toBe("value");
        });

        function Welcomer() {
            this.welcome = function () {
                return "welcome " + this.name;
            };
        }

        Welcomer.prototype.goodbye = function () {
            return 'goodbye ' + this.name;
        };

        it('invokes a constructor method', function () {
            var welcomer = new Welcomer();
            expect(welcomer.welcome.call({name: 'user'})).toBe('welcome user');
            expect(welcomer.welcome.apply({name: 'user'})).toBe('welcome user');
        });

        it('invokes a prototype method', function () {
            var welcomer = new Welcomer();
            expect(welcomer.goodbye.call({name: 'user'})).toBe('goodbye user');
            expect(welcomer.goodbye.apply({name: 'user'})).toBe('goodbye user');
        });

    });
}());


