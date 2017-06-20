function aggregateTable(text) {

    let sum = 0;
    let result = [];
    for (let row of text){

        let town = row.split('|');
        let townName = town[1].trim();
        let money = Number(town[2].trim());
        result.push(townName);
        sum += money;
    }

    console.log(result.join(', ')+ '\n' + sum);
}

aggregateTable(['| Sofia           | 300', '| Veliko Tarnovo  | 500', '| Yambol          | 275']
);