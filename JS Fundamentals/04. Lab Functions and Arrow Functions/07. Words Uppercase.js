function uppercase(input) {

    let upper = input.toUpperCase();
    let words = extractWords();
    words = words.filter(w => w!= '');
    return words.join(', ');
    function extractWords() { return upper.split(/\W+/);}
}

console.log(uppercase('hello'));