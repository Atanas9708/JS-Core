let isOddOrEven = require('./Even Or Odd').isOddOrEven;
let expect = require('chai').expect;

describe('General Test',function () {
    it ('should return even for haha',function () {
        expect(isOddOrEven('haha')).to.equals('even');
    });
    it ('should return odd for hahaa',function () {
        expect(isOddOrEven('hahaa')).to.equals('odd');
    });
    it ('should return undefiend',function () {
        expect(isOddOrEven(5)).to.be.undefined;
    });
});