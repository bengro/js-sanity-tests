(function () {
    'use strict';

    function Car() {
        this.steer = function () {
            return 'steering a car';
        };
    }

    Car.prototype.drive = function () {
        return 'driving a car';
    };

    describe("inheritance", function () {

        describe("objects inheriting from a base constructor", function () {
            describe("inheriting with new operator (deprecated)", function () {
                describe("when not calling the base constructor", function () {
                    function Mini() {}
                    Mini.prototype = new Car();

                    it("has constructor methods of the base object", function () {
                        var mini = new Mini();
                        expect(mini.steer()).toBe('steering a car');
                    });

                    it("has prototype methods of the base object", function () {
                        var mini = new Mini();
                        expect(mini.drive()).toBe('driving a car');
                    });

                    it("has latest prototype methods of the base object", function () {
                        var mini = new Mini();
                        Car.prototype.horn = function () {
                            return "parp";
                        };
                        expect(mini.horn()).toBe("parp");
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

                    it("does not have constructor methods of the base object", function () {
                        var tesla = new Tesla();
                        expect(tesla.steer).toBeUndefined();
                    });

                    it("has prototype methods of the base object", function () {
                        var tesla = new Tesla();
                        expect(tesla.drive()).toBe('driving a car');
                    });

                    it("has latest prototype methods of the base object", function () {
                        var tesla = new Tesla();
                        Car.prototype.horn = function () {
                            return "parp parp";
                        };
                        expect(tesla.horn()).toBe("parp parp");
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

                    it("has constructor methods of the base object", function () {
                        var smartCar = new SmartCar();
                        expect(smartCar.steer()).toBe('steering a car');
                    });

                    it("has prototype methods of the base object", function () {
                        var smartCar = new SmartCar();
                        expect(smartCar.drive()).toBe('driving a car');
                    });

                    it("has latest prototype methods of the base object", function () {
                        var smartCar = new SmartCar();
                        Car.prototype.horn = function () {
                            return "parp parp parp";
                        };
                        expect(smartCar.horn()).toBe("parp parp parp");
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

                    it("has constructor methods of the base object", function () {
                        var taxi = new Taxi();
                        expect(taxi.steer()).toBe('steering a car');
                    });

                    it("does not have prototype methods of the base object", function () {
                        var taxi = new Taxi();
                        expect(taxi.drive).toBeUndefined();
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
