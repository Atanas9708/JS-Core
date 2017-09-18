function occurrences(word,text) {

    let count = 0;
    let str = text.indexOf(word);

    while(str > -1){

        count ++;
        str = text.indexOf(word, str + 1);
    }

    return count;
}

console.log(occurrences('the', 'The quick brown fox jumps over the lay dog.'));