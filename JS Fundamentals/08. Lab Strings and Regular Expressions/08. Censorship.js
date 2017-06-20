function censor(censored,arr) {

    for (let i of arr ){

        let dash = '-'.repeat(i.length);

        while(censored.indexOf(i) > -1){

            censored = censored.replace(i,dash);
        }
    }

    return censored;
}

console.log(censor('roses are red, violets are blue', [', violets are', 'red']));