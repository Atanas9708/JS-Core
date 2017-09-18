let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');
let sharedObject = require('./Shared Object').sharedObject;

document.body.innerHTML = `<div id="wrapper">
        <input type="text" id="name">
        <input type="text" id="income">
    </div>`;


describe ('Shared Object Unit Tests',function () {
    describe('Initial value tests',function () {
        it('should return null for name',function () {
            expect(sharedObject.name).to.be.null;
        });
        it('should return null for income',function () {
            expect(sharedObject.income).to.be.null;
        });
    });
    describe('Change Name Tests',function () {
        it('should return null for empty string for name',function () {
            sharedObject.changeName('');
            expect(sharedObject.name).to.be.null;
        });
        it('should return correct output for name',function () {
            sharedObject.changeName('Pesho');
            expect(sharedObject.name).to.be.equal('Pesho', 'Name did not change correctly!');
        });

        describe('Name input tests',function () {
            it('should return null for empty string for name',function () {
                sharedObject.changeName('vankata');
                sharedObject.changeName('');
                let nameVal = $('#name');
                expect(nameVal.val()).to.be.equal('vankata', 'Name did not change correctly!');
            });
            it('should return correct output for name',function () {
                sharedObject.changeName('pesho');
                let nameVal = $('#name');
                expect(nameVal.val()).to.be.equal('pesho');
            });
        });
    });
    describe('Change Income tests',function () {
        it('should return null for string',function () {
            sharedObject.changeIncome('pesho');
            expect(sharedObject.income).to.be.null;
        });
        it('should change correctly',function () {
            sharedObject.changeIncome(4);
            expect(sharedObject.income).to.be.equal(4, 'Income did not change correctly!');
        });
        it('should return integer for floating-point',function () {
            sharedObject.changeIncome(4);
            sharedObject.changeIncome(3.14);
            expect(sharedObject.income).to.be.equal(4, 'Income did not change!');
        });
        it('should return integer for -4',function () {
            sharedObject.changeIncome(4);
            sharedObject.changeIncome(-4);
            expect(sharedObject.income).to.be.equal(4, 'Income did not change!');
        });
        it('should return integer for zero',function () {
            sharedObject.changeIncome(4);
            sharedObject.changeIncome(0);
            expect(sharedObject.income).to.be.equal(4, 'Income did not change!');
        });

        describe('Income input tests',function () {
            it('should not change for string',function () {
                sharedObject.changeIncome(4);
                sharedObject.changeIncome('pesho');
                let incomeVal = $('#income');
                expect(incomeVal.val()).to.be.equal('4', 'Income input did not change correctly!');
            });
            it('should return positive number',function () {
                sharedObject.changeIncome(4);
                let incomeVal = $('#income');
                expect(incomeVal.val()).to.be.equal('4', 'Income input did not change correctly!');
            });
            it('should not change for floating-point number',function () {
                sharedObject.changeIncome(4);
                sharedObject.changeIncome(3.14);
                let incomeVal = $('#income');
                expect(incomeVal.val()).to.be.equal('4', 'Income input did not change correctly!');
            });
            it('should not change for negative number',function () {
                sharedObject.changeIncome(4);
                sharedObject.changeIncome(-3.14);
                let incomeVal = $('#income');
                expect(incomeVal.val()).to.be.equal('4', 'Income input did not change correctly!');
            });
            it('should not change for zero',function () {
                sharedObject.changeIncome(4);
                sharedObject.changeIncome(0);
                let incomeVal = $('#income');
                expect(incomeVal.val()).to.be.equal('4', 'Income input did not change correctly!');
            });
        });
    });

    describe('Update Name tests',function () {
        it('should not change name for emtpy string',function () {
            sharedObject.changeName('pesho');
            let nameVal = $('#name');
            nameVal.val('');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('pesho', 'Name did not update correctly!');
        });
        it('should change name for emtpy string',function () {
            sharedObject.changeName('pesho');
            let nameVal = $('#name');
            nameVal.val('vankata');
            sharedObject.updateName();
            expect(sharedObject.name).to.be.equal('vankata', 'Name did not update correctly!');
        });
    });

    describe('Update Income tests',function () {
        it('should not change income for string',function () {
            sharedObject.changeIncome(3);
            let incomeVal = $('#income');
            incomeVal.val('hehe');
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not change properly!');
        });
        it('should not change income for floating-point number',function () {
            sharedObject.changeIncome(3);
            let incomeVal = $('#income');
            incomeVal.val(3.14);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not change properly!');
        });
        it('should not change income for negative  number',function () {
            sharedObject.changeIncome(3);
            let incomeVal = $('#income');
            incomeVal.val(-3);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not change properly!');
        });
        it('should not change income for 0',function () {
            sharedObject.changeIncome(3);
            let incomeVal = $('#income');
            incomeVal.val(0);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(3, 'Income did not change properly!');
        });
        it('should change income for positive integer',function () {
            sharedObject.changeIncome(3);
            let incomeVal = $('#income');
            incomeVal.val(5);
            sharedObject.updateIncome();
            expect(sharedObject.income).to.be.equal(5, 'Income did not change properly!');
        });
    })
});