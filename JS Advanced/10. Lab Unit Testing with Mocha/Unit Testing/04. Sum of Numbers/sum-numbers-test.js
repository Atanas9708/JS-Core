let sum = require('./sum-numbers').sum;
let expect = require('chai').expect;

describe('Test summator', function () {
    it('Should return 3 for [1,2]',function () {
        expect (sum([1,2])).to.equal(3);
    });
    it('Should return 0 for []',function () {
        expect (sum([])).to.equal(0);
    });
    it('Should return NaN for []',function () {
        expect (sum(['pesho', 2, 3])).to.be.NaN;
    });
});