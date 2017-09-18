function lastKNumbers(n, k) {

    let point = [1];
    let result = 0;

    for (let i = 1; i < n; i ++){

        let start = Math.max(0, i - k);
        let end = i - 1;
        let sum  = point[start] + point[end];
        point[i] = sum;

    }

    console.log(point.join(' '));
}

console.log(lastKNumbers(6, 3));