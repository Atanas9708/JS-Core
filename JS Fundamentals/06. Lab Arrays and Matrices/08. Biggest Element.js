function biggestNum(matrix) {

    let biggest = Number.NEGATIVE_INFINITY;

    matrix.forEach(r => r.forEach(c => biggest = Math.max(biggest,c)))

    return biggest;
}

console.log(biggestNum([[20, 50, 10], [8, 33, 145]]));