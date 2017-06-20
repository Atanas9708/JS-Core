function townsJson(arr) {
    arr.shift();
    let towns = [];
    for (let row of arr){

        let arrTokens = row.split('|')
            .filter(e => e !== '')
            .map(e => e.trim());
        let obj = {
            Town: arrTokens[0],
            Latitude: Number(arrTokens[1]),
            Longitude: Number(arrTokens[2])
        }

        towns.push(obj);
    }

    console.log(JSON.stringify(towns));

}

townsJson(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
);