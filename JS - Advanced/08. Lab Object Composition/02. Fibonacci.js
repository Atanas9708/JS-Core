let fibonacci = (function () {
    let fibNums = [1];
    let f1 = 0;
    let f2 = 1;

    return function (num) {
        for (let i = 0; i < num - 1; i++){
            fibNums.push(f1 + f2);
            f1 = f2;
            f2 = fibNums[fibNums.length - 1];
        }

        return fibNums;
    }
})();

console.log(fibonacci(5));