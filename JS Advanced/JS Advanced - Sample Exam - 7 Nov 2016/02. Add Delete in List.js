let expect = require('chai').expect;

describe('Add Delete Tests', function () {
    let list;
    beforeEach(function () {
        list = (function () {
            let data = [];
            return {
                add: function (item) {
                    data.push(item);
                },
                delete: function (index) {
                    if (Number.isInteger(index) && index >= 0 && index < data.length) {
                        return data.splice(index, 1)[0];
                    } else {
                        return undefined;
                    }
                },
                toString: function () {
                    return data.join(", ");
                }
            };
            return list;
        })();
    });

    it('testing with add',function () {
        list.add(1);
        list.add('Kappa');
        list.add(10);
        list.add(true);
        expect(list.toString()).to.be.equal('1, Kappa, 10, true');
    });
    it('testing with delete',function () {
        list.add(12);
        list.add('Nasko');
        list.add(false);
        list.delete(0);
        expect(list.toString()).to.be.equal('Nasko, false');
    });
    it('testing with delete (at correct index)',function () {
        list.add(12);
        list.add('Nasko');
        list.add(false);
        expect(list.delete(0)).to.be.equal(12);
    });
    it('testing with non-integer index',function () {
        list.add(1);
        list.add('Nasko');
        list.add(2);
        expect(list.delete(2.2)).to.be.undefined;
    });
    it('testing with negative index',function () {
        list.add(1);
        list.add('Nasko');
        list.add(2);
        expect(list.delete(-2)).to.be.undefined;
    });
    it('testing with non-exsisting index',function () {
        list.add(1);
        list.add('Nasko');
        list.add(2);
        expect(list.delete(5)).to.be.undefined;
    });
    it('testing with correct input',function () {
        let arr = [1, 'pesho', true];
        arr.forEach(el => list.add(el));
        expect(list.toString()).to.be.equal(arr.join(', '));
    });
});