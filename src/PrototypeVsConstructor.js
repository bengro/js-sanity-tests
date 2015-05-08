(function () {
    'use strict';

    function Cat() {
        this.age = 5;
        var name = 'Pivo';

        this.talk = function () {
            return "miiiaow";
        };

        this.getName = function () {
            return name;
        };
    }

    describe('prototype vs constructor', function () {

        describe("Object.create vs new", function () {
            var newCat = new Cat(),
                createCat = Object.create(Cat.prototype);

            it("we can access constructor methods only using new", function () {
                expect(newCat.talk).toBeDefined();
                expect(createCat.talk).toBeUndefined();
            });

            it("we can access constructor properties only using new", function () {
                expect(newCat.age).toBe(5);
                expect(createCat.age).toBeUndefined();
            });

            it("we can access prototype properties using either object creation method", function () {
                Cat.prototype.lives = 9;
                expect(newCat.lives).toBe(9);
                expect(createCat.lives).toBe(9);
            });

            it("we can access prototype methods using either object creation method", function () {
                Cat.prototype.sing = function () {
                    return "la la la";
                };
                expect(newCat.sing()).toBe("la la la");
                expect(createCat.sing()).toBe("la la la");
            });

            it("instantiated objects are instances of the constructor using either object creation method", function () {
                expect(newCat instanceof Cat).toBeTruthy();
                expect(createCat instanceof Cat).toBeTruthy();
            });
        });

        describe("the new operator", function () {
            it("returns instantiated object", function () {
                var cat = new Cat();
                expect(cat).toBeDefined();
            });

            it("throws an error on an already instantiated object", function () {
                var cat = new Cat();
                expect(
                    function () {
                        new cat();
                    }
                ).toThrow(new TypeError("object is not a function"));
            });
        });

        describe("variables defined in the constructor", function () {
            it("when set using this, they are accessible on instantiated objects ", function () {
                var cat = new Cat();
                expect(cat.age).toBe(5);
            });

            it("when set using var, they are not accessible on instantiated objects", function () {
                var cat = new Cat();
                expect(cat.name).toBe(undefined);
            });


        });

        describe("methods defined in the constructor", function () {
            it("cannot be overridden by prototype methods",
                function () {
                    Cat.prototype.talk = function () {
                        return "hello";
                    };

                    var cat = new Cat();
                    expect(cat.talk()).toBe("miiiaow");
                });

            it("are not available 'statically'", function () {
                expect(Cat.talk).toBeUndefined();
            });
        });

        describe("static methods added to the constructor", function () {
            Cat.ageDifference = function (catA, catB) {
                return catA.age - catB.age;
            };

            it("is available as a 'static' method", function () {
                var oldCat = new Cat();
                var youngCat = new Cat();
                youngCat.age = 3;
                expect(Cat.ageDifference(oldCat, youngCat)).toBe(2);
            });

            it("is not available from an instantiated cat", function () {
                var cat = new Cat();
                expect(cat.ageDifference).toBeUndefined();
            });
        });

        describe("variables defined on the prototype", function () {
            Cat.prototype.paws = 4;

            it("is accessible on instantiated objects", function () {
                var cat = new Cat();
                expect(cat.paws).toBe(4);
            });

            it("can be mutated later, updating all existing objects", function () {
                var cat = new Cat();
                Cat.prototype.paws = 3;
                expect(cat.paws).toBe(3);
            });

            it("can be mutated later, updating all new objects", function () {
                Cat.prototype.paws = 5;
                var anotherCat = new Cat();
                expect(anotherCat.paws).toBe(5);
            });
        });

        describe("methods defined on the prototype", function () {
            Cat.prototype.eat = function () {
                return "munch munch";
            };

            it("are available when a new Cat is instantiated", function () {
                var cat = new Cat();
                expect(cat.eat()).toBe("munch munch");
            });

            it("are not available 'statically'", function () {
                expect(Cat.eat).toBeUndefined();
            });
        });

    });

}())