function triangleOfDollars(input) {

    let line = '';

    for (let col = 1; col<= input; col++){

        line += '$';
        console.log(line);
    }

}

console.log(triangleOfDollars(3));