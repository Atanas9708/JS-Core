let createList = require('./add-swap-shiftLeft-shiftRight');
let expect = require('chai').expect;

describe('Create List Tests', function () {
    let list;
    beforeEach(function () {
       list = new createList();
    });
   describe('Initial Tests', function () {
       it('test add', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           expect(list.toString()).to.equal('1, 2, 3');
       });
       it('test shiftLeft', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           list.shiftLeft();
           expect(list.toString()).to.equal('2, 3, 1')
       });
       it('test shiftRight',function () {
           list.add(1);
           list.add(2);
           list.add(3);
           list.shiftRight();
           expect(list.toString()).to.equal('3, 1, 2');
       });
       it('test swap', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           list.swap(0, 2);
           expect(list.toString()).to.equal('3, 2, 1');
       });

   });

   describe('test functionality with swap', function () {
       it('test with equal indexes', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           expect(list.swap(1, 1)).to.equal(false);
       });
       it('test with biggern than list length index1', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           expect(list.swap(3, 0)).to.equal(false);
           expect(list.toString()).to.equal('1, 2, 3');
       });
       it('test with bigger than list length index2', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           expect(list.swap(0, 3)).to.equal(false);
           expect(list.toString()).to.equal('1, 2, 3');
       });
       it('test with non-integer index', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           expect(list.swap(1.1, 2)).to.equal(false);
           expect(list.toString()).to.equal('1, 2, 3');
       });
       it('test with negative index1', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           expect(list.swap(-1.1, 2)).to.equal(false);
           expect(list.toString()).to.equal('1, 2, 3');
       });
       it('test with negative index2', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           expect(list.swap(1, 0)).to.equal(true);
           expect(list.toString()).to.equal('1, 2, 3');
       });
       it('test with negative index2 modify', function () {
           list.add(1);
           list.add(2);
           list.add(3);
           list.swap(1, 0)
           expect(list.toString()).to.equal('2, 1, 3');
       });
   });
});