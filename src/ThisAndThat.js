describe('this & that', function () {


    describe('in strict mode', function () {
        "use strict";
        describe('an object with only one layer of methods', function () {
            var object = {};
            object.value = 10;
            object.outer = function () {
                var that = this;
                return {
                    thatValue: that,
                    thisValue: this
                };
            };

            it("this is accessible by the method", function () {
                var vals = object.outer();
                expect(vals.thatValue).toBe(object);
                expect(vals.thisValue).toBe(object);
            });

        });

        describe('an object with nested methods', function () {
            var object = {};
            object.value = 10;
            object.outer = function () {
                var that = this;
                function inner() {
                    return {
                        thatValue: that,
                        thisValue: this
                    };
                }
                return inner();
            };

            it("this is not accessible by the inner method", function () {
                var vals = object.outer();
                expect(vals.thatValue).toBe(object);
                expect(vals.thisValue).toBe(undefined);
            });

        });
    });

    describe("not in strict mode", function () {

        describe('an object with only one layer of methods', function () {
            var object = {};
            object.value = 10;
            object.outer = function () {
                var that = this;
                return {
                    thatValue: that,
                    thisValue: this
                };
            };

            it("this is accessible by the method", function () {
                var vals = object.outer();
                expect(vals.thatValue).toBe(object);
                expect(vals.thisValue).toBe(object);
            });

        });

        describe('an object with nested methods', function () {
            var object = {};
            object.value = 10;
            object.outer = function () {
                var that = this;
                function inner() {
                    return {
                        thatValue: that,
                        thisValue: this
                    };
                }
                return inner();
            };

            it("this is not accessible by the inner method, so window is used", function () {
                var vals = object.outer();
                expect(vals.thatValue).toBe(object);
                expect(vals.thisValue).toBe(window);
            });

        });

    });
});