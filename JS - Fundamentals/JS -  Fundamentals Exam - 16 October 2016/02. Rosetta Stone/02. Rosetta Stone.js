function solve(input) {

    let templateLength = Number(input[0]);
    let templateMatrix = [];
    let encodedMatrix = [];

    for (let i = 1; i < 1 + templateLength; i++){
        let currentRow = input[i];
        templateMatrix.push(currentRow.split(' ').map(Number));
    }

    for (let i = 1 + templateLength; i < input.length; i++){
        let currentRow = input[i];
        encodedMatrix.push(currentRow.split(' ').map(Number));
    }

    let templateMatrixRows = templateLength;
    let templateMatrixCols = templateMatrix[0].length;

    for (let encodedRow = 0; encodedRow < encodedMatrix.length; encodedRow += templateMatrixRows){
        for (let encodedCol = 0; encodedCol < encodedMatrix[encodedRow].length; encodedCol += templateMatrixCols){

            for (let templateRow = 0; templateRow < templateMatrix.length; templateRow++){
                for (let templateCol = 0; templateCol < templateMatrix[templateRow].length; templateCol++){

                    let targetRow = encodedRow + templateRow;
                    let targetCol = encodedCol + templateCol;

                    if (targetCol < encodedMatrix[encodedRow].length && targetRow < encodedMatrix.length){
                        let summedNumber = encodedMatrix[targetRow][targetCol] + templateMatrix[templateRow][templateCol];
                        summedNumber %= 27;

                        if (summedNumber === 0){
                            encodedMatrix[targetRow][targetCol] = ' ';
                        } else {
                            encodedMatrix[targetRow][targetCol] = String.fromCharCode(summedNumber + 64);
                        }
                    }
                }
            }
        }
    }

    let output = '';
    encodedMatrix.forEach(e => e.forEach(l => output += l));
    console.log(output.trim());
}

solve(
    [ '2',
    '59 36',
    '82 52',
    '4 18 25 19 8',
    '4 2 8 2 18',
    '23 14 22 0 22',
    '2 17 13 19 20',
    '0 9 0 22 22' ]
);

solve(
    [ '2',
        '31 32',
        '74 37',
        '19 0 23 25',
        '22 3 12 17',
        '5 9 23 11',
        '12 18 10 22' ]
);