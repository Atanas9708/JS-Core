function solve(input) {
    let matrix = input.map(m => m.split(''));
    let checkMatrix = input.map(m => m.toLowerCase().split(''));

    for (let row = 0; row < input.length - 2 ; row++){
        for (let col = 0; col < input[row].length - 2; col++){
            let currentChar = checkMatrix[row][col];

            if (checkMatrix[row][col + 2] === currentChar
                && checkMatrix[row + 1][col + 1] === currentChar
                && checkMatrix[row + 2][col] === currentChar
                && checkMatrix[row + 2][col + 2] === currentChar){

                matrix[row][col] = '';
                matrix[row][col + 2] = '';
                matrix[row + 1][col + 1] = '';
                matrix[row + 2][col] = '';
                matrix[row + 2][col + 2] = '';
            }
        }
    }

    for (let line of matrix){
        console.log(line.join(''));
    }
}

solve([
    'abnbjs',
    'xoBab',
    'Abmbh',
    'aabab',
    'ababvvvv'
]);