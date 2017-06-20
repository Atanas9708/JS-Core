function match(input) {

    let pattern = /\W+/;
    input = input.split(pattern);


    return input.filter(w => w!='').join('|');
}

console.log(match('_(Underscores) are also word characters'));