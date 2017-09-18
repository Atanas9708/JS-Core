let makeList = require ('./add-left-right-clear');
let expect = require ('chai').expect;

describe('List Tests', function () {
   let myList;
   beforeEach(function () {
       myList = makeList();
   });
   it('test with addLeft',function () {
       myList.addLeft(5);
       myList.addLeft(10);
       myList.addLeft(15);
       expect(myList.toString()).to.equal('15, 10, 5');
   });
   it('test with addRight', function () {
       myList.addRight(5);
       myList.addRight(10);
       myList.addRight(15);
       expect(myList.toString()).to.equal('5, 10, 15');
   });
   it('test with clear', function () {
       myList.addRight(5);
       myList.addRight(10);
       myList.addRight(15);
       myList.clear();
       expect(myList.toString()).to.equal('');
   });
});