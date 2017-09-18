function orbit(arr) {
    let [rows, cols, x, y] = arr;

    let matrix = [];
    for (let i = 0; i < rows; i++){
        matrix.push('0'.repeat(cols).split('').map(Number));
    }

    let num = 1;
    matrix[x][y] = num;
    let count = 1;
    let currentRow = x;
    let currentCol = y;

    while (true){
        let isFilled = false;
        num++;
        let startRow = Math.max(0, currentRow - count);
        let endRow = Math.min(matrix.length - 1, currentRow + count);
        let startCol = Math.max(0, currentCol - count);
        let endCol = Math.min(matrix.length - 1, currentCol + count);

        for (let row = startRow; row <= endRow; row ++){
            for (let col = startCol; col <= endCol; col++){
                if(matrix[row][col] == 0){
                    matrix[row][col] = num;
                    isFilled = true;
                }
            }
        }


        count++;
        if(!isFilled){
            break;
        }
    }

    let result = matrix.map(row => row.join(' ')).join('\n');
    console.log(result);
    function isFilled(matrix) {

        for (let row = 0; row < matrix.length; row++){
            for(let col = 0; col< matrix[row].length; col++){

                if(matrix[row][col] == 0){
                    return false;
                }
            }
        }

        return true;
    }
}