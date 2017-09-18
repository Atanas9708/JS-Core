let lookupChar = require('./Char Lookup').lookupChar;
let expect = require('chai').expect;

describe('General Tests',function () {
    it ('should return undefiend for 4',function () {
        expect(lookupChar(4, 1)).to.be.undefined;
    });
    it ('should return undefiend for 4',function () {
        expect(lookupChar('str', '4')).to.be.undefined;
    });
    it ('should return undefiend for 3.14',function () {
        expect(lookupChar('str', 3.14)).to.be.undefined;
    });
    it ('should return Incorrect index for -2',function () {
        expect(lookupChar('str', -2)).to.equals('Incorrect index');
    });
    it ('should return Incorrect index for 50',function () {
        expect(lookupChar('str', 50)).to.equals('Incorrect index');
    });
    it ('should return s for 0',function () {
        expect(lookupChar('str', 0)).to.equals('s');
    });
    it ('should return r for 2',function () {
        expect(lookupChar('str', 2)).to.equals('r');
    });
});