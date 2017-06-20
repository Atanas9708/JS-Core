function solve(input) {

    let templateMatrix = [];
    let templateMatrixLength = Number(input.shift());

    for (let i = 0; i < templateMatrixLength; i++){
        templateMatrix.push(input.shift().split(' ').map(Number));
    }

    let encodedMatrix = [];

    for (let i = 0; i < input.length; i++){
        encodedMatrix.push(input[i].split(' ').map(Number));
    }

    for (let i = 0; i < encodedMatrix.length; i++){
        for(let j = 0; j < encodedMatrix[i].length; j++){
            encodedMatrix[i][j] += templateMatrix[i%templateMatrix.length][j%templateMatrix[0].length];
            encodedMatrix[i][j] %= 27;

            if(encodedMatrix[i][j] == 0){
                encodedMatrix[i][j] = ' ';
            } else {
                encodedMatrix[i][j] = String.fromCharCode(64 + encodedMatrix[i][j]);
            }
        }
    }

    let encodedMessage = '';

    for (let row of encodedMatrix){
        for (let char of row){
            encodedMessage += char;
        }
    }

    console.log(encodedMessage);
}

solve([ '2',
    '59 36',
    '82 52',
    '4 18 25 19 8',
    '4 2 8 2 18',
    '23 14 22 0 22',
    '2 17 13 19 20',
    '0 9 0 22 22' ]
);
