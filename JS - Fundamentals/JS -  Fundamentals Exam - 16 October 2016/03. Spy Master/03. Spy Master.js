function solve(input) {
    let specialKey = input[0];

    let pattern = `(\\s|^)(${specialKey}\\s+)([!%$#A-Z]{8,})(\\s|\\.|,|$)`;
    let regex = new RegExp(pattern, 'gi');

    for (let i = 1; i < input.length; i ++){
        let currentWord = input[i];

        let match;
        while (match = regex.exec(currentWord)){

            let encodedWord = match[3];

            if (encodedWord !== encodedWord.toUpperCase()){
                continue;
            }

            let decodedWord = decodeWord(encodedWord);
            let decodedMessage = match[1] + match[2] + decodedWord + match[4];
            currentWord = currentWord.replace(match[0], decodedMessage);
        }

        console.log(currentWord);
    }

    function decodeWord(encodedWord) {
        while(encodedWord.indexOf('!') !== -1){
            encodedWord = encodedWord.replace('!', 1);
        }
        while(encodedWord.indexOf('%') !== -1){
            encodedWord = encodedWord.replace('%', 2);
        }
        while(encodedWord.indexOf('#') !== -1){
            encodedWord = encodedWord.replace('#', 3);
        }
        while(encodedWord.indexOf('$') !== -1){
            encodedWord = encodedWord.replace('$', 4);
        }

        return encodedWord.toLowerCase();

    }
}

solve([
    'specialKey',
    'In this text the specialKey HELLOWORLD! is correct, but',
    'the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while',
    'SpeCIaLkeY   SOM%%ETH$IN and SPECIALKEY ##$$##$$ are!'
]);