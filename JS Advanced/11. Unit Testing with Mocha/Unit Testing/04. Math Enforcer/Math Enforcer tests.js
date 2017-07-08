let mathEnforcer = require('./Math Enforcer').mathEnforcer;
let expect = require('chai').expect;

describe ('Math Enforcer',function () {
    describe('AddFive',function () {
        it ('should return undefiend for 2',function () {
            expect(mathEnforcer.addFive('2')).to.be.undefined;
        });
        it ('should return 10 for 5',function () {
            expect(mathEnforcer.addFive(5)).to.equals(10);
        });
        it ('should return 10.5 for 5.5',function () {
            expect(mathEnforcer.addFive(5.5)).to.equals(10.5);
        });
        it ('should return 4 for -1',function () {
            expect(mathEnforcer.addFive(-1)).to.equals(4);
        });

    });

    describe('SubtractTen',function () {
        it ('should return undefiend for 5',function () {
            expect(mathEnforcer.subtractTen('5')).to.be.undefined;
        });
        it ('should return 1 for subtract 11',function () {
            expect(mathEnforcer.subtractTen(11)).to.equals(1);
        });
        it ('should return 8.87 for subtract 1.13',function () {
            expect(mathEnforcer.subtractTen(1.13)).to.be.closeTo(-8.87, 0.001);
        });
        it ('should return -11 for subtract -1',function () {
            expect(mathEnforcer.subtractTen(-1)).to.be.equals(-11);
        });
    });

    describe('Sum',function () {
        it ('should return undefiend for param1',function () {
            expect(mathEnforcer.sum('param1',5)).to.be.undefined;
        });
        it ('should return undefiend for param2',function () {
            expect(mathEnforcer.sum(5,'param1')).to.be.undefined;
        });
        it ('should return -4 for 1,-5',function () {
            expect(mathEnforcer.sum(1,-5)).to.equals(-4);
        });
        it ('should return 2.2 for 1.1,1.1',function () {
            expect(mathEnforcer.sum(1.1,1.1)).to.equals(2.2);
        });
        it ('should return 8.87 for subtract 1.13',function () {
            expect(mathEnforcer.subtractTen(1.13)).to.be.closeTo(-8.87, 0.001);
        });
    });
});