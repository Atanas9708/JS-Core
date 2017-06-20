function extract(input) {

    let result = [];
    let pattern = /www\.[A-Za-z0-9\-]+(\.[a-z]+)+/g;

    for (let row of input){

        let match = pattern.exec(row)
        while (match){

            result.push(match[0])
            match = pattern.exec(row)
        }
    }

    console.log(result.join('\n'));
}

extract()