(function () {
    'use strict';

    function Car() {
        this.steer = function () {
            return 'steering a car';
        };
    }

    Car.prototype.color = 'green';
    Car.prototype.drive = function () {
        return 'driving a car';
    };

    function Ferrari() {
        this.breakdown = function () {
            return 'breaking down';
        };
    }

    Ferrari.prototype = Object.create(Car.prototype);


    describe("inheritance", function () {

        describe("basics", function () {
            var ferrari = new Ferrari();

            //TODO add a test of constructor property
            //TODO how could we change the Car property via the redFerrari obj? -> using constructor property

            it("base object follows changes of its prototype", function () {
                var car = new Car();
                expect(car.horn).toBeUndefined();
                Car.prototype.horn = function () {
                    return "beep";
                };
                expect(car.horn()).toBe("beep");
            });

            it("derived object follows changes of its base object's prototype", function () {
                Car.prototype.horn = function () {
                    return "parp";
                };
                expect(ferrari.horn()).toBe("parp");
            });

            it("changing a property on the derived object hides the base object's value of that property", function () {
                var redFerrari = new Ferrari();
                expect(redFerrari.color).toBe('green');
                redFerrari.color = 'red';
                expect(redFerrari.color).toBe('red');
            });

            it("derived object follows changes to base object's properties", function () {
                var newFerrari = new Ferrari();
                expect(newFerrari.color).toBe('green');
                Car.prototype.color = 'blue';
                expect(newFerrari.color).toBe('blue');
            });
        });

        describe("objects inheriting from a base constructor", function () {
            describe("inheriting with new operator (deprecated)", function () {
                describe("when not calling the base constructor", function () {
                    function Mini() {}

                    Mini.prototype = new Car();

                    it("has prototype methods of the base object", function () {
                        var mini = new Mini();
                        expect(mini.drive()).toBe('driving a car');
                    });

                    it("has constructor methods of the base object", function () {
                        var mini = new Mini();
                        expect(mini.steer()).toBe('steering a car');
                    });

                    it("is an instance of the base object", function () {
                        var mini = new Mini();
                        expect(mini instanceof Mini).toBeTruthy();
                        expect(mini instanceof Car).toBeTruthy();
                        expect(mini instanceof Object).toBeTruthy();
                    });
                });

            });

            describe("inheriting with Object.create", function () {
                describe("when not calling the base constructor", function () {
                    function Tesla() {
                    }

                    Tesla.prototype = Object.create(Car.prototype);

                    it("has prototype methods of the base object", function () {
                        var tesla = new Tesla();
                        expect(tesla.drive()).toBe('driving a car');
                    });

                    it("does not have constructor methods of the base object", function () {
                        var tesla = new Tesla();
                        expect(tesla.steer).toBeUndefined();
                    });

                    it("is an instance of the base object", function () {
                        var tesla = new Tesla();
                        expect(tesla instanceof Car).toBeTruthy();
                    });
                });

                describe("when calling the base constructor", function () {
                    function SmartCar() {
                        Car.call(this);
                    }

                    SmartCar.prototype = Object.create(Car.prototype);

                    it("has prototype methods of the base object", function () {
                        var smartCar = new SmartCar();
                        expect(smartCar.drive()).toBe('driving a car');
                    });

                    it("has prototype methods of the base object", function () {
                        var smartCar = new SmartCar();
                        expect(smartCar.steer()).toBe('steering a car');
                    });

                    it("is an instance of the base object", function () {
                        var smartCar = new SmartCar();
                        expect(smartCar instanceof Car).toBeTruthy();
                    });
                });
            });

            describe("inheriting without using new or Object.create", function () {
                describe("by using call() on the base constructor", function () {
                    function Taxi() {
                        Car.call(this);
                    }

                    it("does not have prototype methods of the base object", function () {
                        var taxi = new Taxi();
                        expect(taxi.drive).toBeUndefined();
                    });

                    it("has constructor methods of the base object", function () {
                        var taxi = new Taxi();
                        expect(taxi.steer()).toBe('steering a car');
                    });

                    it("is not an instance of the base object", function () {
                        var taxi = new Taxi();
                        expect(taxi instanceof Car).toBeFalsy();
                    });
                });
            });
        });

    });

}());
