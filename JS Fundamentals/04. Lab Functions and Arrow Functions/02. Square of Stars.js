function printRectangleOfStars(n) {

    if (n == undefined){

        n = 5;
    }
    for (let i = 1; i <= n; i++){

        console.log('*' + ' *'.repeat(n-1));
    }
}
console.log(printRectangleOfStars());