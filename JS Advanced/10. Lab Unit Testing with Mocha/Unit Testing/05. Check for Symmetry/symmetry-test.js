let isSymmetric = require('./symmetry').isSymmetric;
let expect = require('chai').expect;

describe('Check Symmetry', function () {
    describe('General test', function () {
        it ('should be a function', function () {
            expect(typeof isSymmetric).to.equal('function');
        });
    });
    describe('Value test', function () {
        it ('should return true for [1, 2, 3, 3, 2, 1]', function () {
            expect(isSymmetric([1, 2, 3, 3, 2, 1])).to.be.true;
        });
        it ('should return false for [1, 2, 3, 4, 2, 1]', function () {
            expect(isSymmetric([1, 2, 3, 4, 2, 1])).to.be.false;
        });
        it ('should return true for [1, 2, 3, 2, 1]', function () {
            expect(isSymmetric([1, 2, 3, 3, 2, 1])).to.be.true;
        });
        it ('should return false for [1, 2, 3, 4, 1]', function () {
            expect(isSymmetric([1, 2, 3, 4, 2, 1])).to.be.false;
        });
        it ('should return false for [1, 2]', function () {
            expect(isSymmetric([1, 2])).to.be.false;
        });
        it ('should return true for [1]', function () {
            expect(isSymmetric([1])).to.be.true;
        });
        it ('should return true for [5, "hi" ,{a:5},new Date(),{a:5},"hi",5]', function () {
            expect(isSymmetric([5, "hi" ,{a:5},new Date(),{a:5},"hi",5])).to.be.true;
        });
        it ('should return false for [5, "hi" ,{a:5},new Date(),{a:5},5]', function () {
            expect(isSymmetric([5, "hi" ,{a:5},new Date(),{a:5} ,5])).to.be.false;
        });
        it ('should return false for 1, 2, 3', function () {
            expect(isSymmetric(1, 2, 3)).to.be.false;
        });
    })
});
