let SortedList = require('./sorted-list').SortedList;
let expect = require('chai').expect;

describe('Sorted List Tests',function () {
    let myList;
    beforeEach(function () {
        myList = new SortedList();
    });
    describe('Initial Tests',function () {
        it('check if add exists',function () {
            expect(SortedList.prototype.hasOwnProperty('add')).to.equal(true);
        });
        it('check if remove exists',function () {
            expect(SortedList.prototype.hasOwnProperty('remove')).to.equal(true);
        });
        it('check if get exists',function () {
            expect(SortedList.prototype.hasOwnProperty('get')).to.equal(true);
        });
        it('check if size exists',function () {
            expect(SortedList.prototype.hasOwnProperty('size')).to.equal(true);
        });
    });
    describe('Test Add', function () {
        it('test with one element',function () {
            myList.add(5);
            expect(myList.list.join(', ')).to.equal('5');
        });
        it('test with many element',function () {
            myList.add(5);
            myList.add(10);
            myList.add(15);
            expect(myList.list.join(', ')).to.equal('5, 10, 15');
        });
    });

    describe('Test Remove',function () {
        it('test with empty list', function () {
            expect(() => myList.remove()).throw(Error, 'Collection is empty.');
        });
        it('test with negative index', function () {
            myList.add(5);
            expect(() => myList.remove(-1)).throw(Error, 'Index was outside the bounds of the collection.');
        });
        it('test with equal to list length', function () {
            myList.add(5);
            expect(() => myList.remove(1)).throw(Error, 'Index was outside the bounds of the collection.');
        });
        it('test with bigger than list length', function () {
            myList.add(5);
            expect(() => myList.remove(6)).throw(Error, 'Index was outside the bounds of the collection.');
        });
        it('test with correct index',function () {
            myList.add(5);
            myList.add(4);
            myList.add(3);
            myList.remove(1);
            expect(myList.list.join(', ')).to.equal('3, 5');
        });
    });

    describe('Test Get', function () {
        it('test with empty list', function () {
            expect(() => myList.get()).throw(Error, 'Collection is empty.');
        });
        it('test with negative index', function () {
            myList.add(5);
            expect(() => myList.get(-1)).throw(Error, 'Index was outside the bounds of the collection.');
        });
        it('test with equal to list length', function () {
            myList.add(5);
            expect(() => myList.get(1)).throw(Error, 'Index was outside the bounds of the collection.');
        });
        it('test with bigger than list length', function () {
            myList.add(5);
            expect(() => myList.get(6)).throw(Error, 'Index was outside the bounds of the collection.');
        });
        it('test with correct index',function () {
            myList.add(5);
            myList.add(10);
            myList.add(15);
            expect(myList.get(1)).to.equal(10);
        });
    });

    describe('Test Size', function () {
        it('test with empty list',function () {
            expect(myList.size).to.equal(0);
        });
        it('with non-empty list', function () {
            myList.add(5);
            myList.add(15);
            myList.add(25);
            expect(myList.size).to.equal(3);
        });
    });
});