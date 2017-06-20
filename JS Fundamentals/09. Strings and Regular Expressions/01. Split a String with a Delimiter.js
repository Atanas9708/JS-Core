function split(string, delimeter) {

    let splitted = string.split(delimeter);

    for (let i = 0; i < splitted.length; i++){

        console.log(splitted[i]);
    }
}

split('One-Two-Three-Four-Five -');