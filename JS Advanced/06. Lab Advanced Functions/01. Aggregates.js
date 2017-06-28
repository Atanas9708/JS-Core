function aggregate(arr) {
    function reduce(arr, func) {
        let result = arr[0];
        for (let nextNum of arr.slice(1)){
            result = func(result, nextNum);
        }
        return result;
    }
    console.log('Sum = ' + reduce(arr, (a, b) => a + b));
    console.log('Min = ' + reduce(arr, (a, b) => a > b ? b : a));
    console.log('Max = ' + reduce(arr, (a, b) => a > b ? a : b));
    console.log('Product = ' + reduce(arr, (a, b) => a * b));
    console.log('Join = ' + reduce(arr, (a, b) => '' + a + b));
}
let arr = [5, 10, 20];

aggregate(arr);