function diagonalSums(matrix) {

    let main = 0;
    let secondary = 0;

    for (let row = 0; row < matrix.length; row++){

        main+= matrix[row][row];
        secondary += matrix[row][matrix.length-row-1];
    }

    console.log(main + ' ' + secondary);
}

diagonalSums([[20, 40], [10, 60]]);