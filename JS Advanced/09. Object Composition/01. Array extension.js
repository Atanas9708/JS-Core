(function solve(){
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
    Array.prototype.skip =  function(n) {
        let arr = [];
        for (let i = n; i < this.length; i++){
            arr.push(this[i]);
        }
        return arr;
    };
    Array.prototype.take = function(n) {
        let arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(this[i]);
        }
        return arr;
    };
    Array.prototype.sum = function() {
        let sum = 0;
        for (let num of this) {
            sum += Number(num)
        }
        return sum
    };
    Array.prototype.average = function() {
        return this.sum() / this.length
    }
})();

console.log([1, 2, 3, 4].average());
console.log([1, 2, 3, 4].take(2));
console.log([1, 2, 3, 4].skip(2));
console.log([1, 2, 3, 4].last());
console.log([1, 2, 3, 4].sum());