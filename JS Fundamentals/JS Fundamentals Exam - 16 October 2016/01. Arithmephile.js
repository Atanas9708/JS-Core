function solve(numbers) {

    numbers = numbers.map(Number);
    let max = -Infinity;

    while (numbers.length > 0){

        let count = numbers.shift();
        if (count >= 10 || count < 0) continue;
        let n = 1;
        for (let i = 0; i < count; i++){
            n *= numbers[i];
        }
        if (n > max){
            max = n;
        }
    }

    console.log(max);
}

solve([
    '10',
    '20',
    '2',
    '30',
    '44',
    '3',
    '56',
    '20',
    '24'
])