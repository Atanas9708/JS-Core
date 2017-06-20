function solve(input) {

    let result = [];
    let pattern = /\b_([a-zA-Z0-9]+)\b/g;

    let match = pattern.exec(input);

    while(match){
        result.push(match[1]);
        match = pattern.exec(input);
    }


    console.log(result.join(','));
}

solve('The _id and _age variables are both integers.');