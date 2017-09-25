function solve(input) {
    input = input.map(Number);

    let biggestNumber = -Infinity;

    for (let i = 0; i < input.length; i++){
        let number = input[i];
        if (number > 0 && number < 10){
            let currentProduct = 1;
            for (let j = i + 1; j <= i + number; j++){
                currentProduct *= input[j];
            }

            if (currentProduct > biggestNumber){
                biggestNumber = currentProduct;
            }
        }
    }

    console.log(biggestNumber);
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
]);