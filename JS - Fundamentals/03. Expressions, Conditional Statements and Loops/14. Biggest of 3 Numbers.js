function biggestNumber(input) {

    let n1 = input[0];
    let n2 = input[1];
    let n3 = input[2];

    let max = Math.max(n1,n2,n3);

    return max;

}

console.log(biggestNumber([5,-2,7]));