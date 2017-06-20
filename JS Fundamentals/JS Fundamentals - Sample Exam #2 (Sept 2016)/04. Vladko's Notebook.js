function solve(input) {
    let obj = {};

    for(let line of input){
        let tokens = line.split("|");

        if(! obj.hasOwnProperty(tokens[0])){
            obj[tokens[0]] = {
                wins: 1,
                losses : 1,
                opponents : []
            }
        }

        switch(tokens[1]){
            case "name": obj[tokens[0]]['name'] = tokens[2]; break;
            case "age": obj[tokens[0]]['age'] = tokens[2]; break;
            case "win":
                obj[tokens[0]]['wins']++;
                obj[tokens[0]]['opponents'].push(tokens[2]);
                break;
            case "loss":
                obj[tokens[0]]['losses']++;
                obj[tokens[0]]['opponents'].push(tokens[2]);
                break;
        }
    }

    for(let color of Object.keys(obj)){
        obj[color]['opponents'] = obj[color]['opponents'].sort();
    }

    let outputObj = {};

    for(let color of Object.keys(obj).sort()){
        if(obj[color]['age'] != undefined && obj[color]['name'] != undefined){
            outputObj[color] = {
                age: obj[color]['age'],
                name: obj[color]['name'],
                opponents: obj[color]['opponents'],
                rank: (obj[color]['wins'] / obj[color]['losses']).toFixed(2)
            }
        }
    }

    console.log(JSON.stringify(outputObj));
}

solve([
    'purple|age|99',
    'red|age|44',
    'blue|win|pesho',
    'blue|win|mariya',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Kiko',
    'purple|loss|Yana',
    'purple|loss|Yana',
    'purple|loss|Manov',
    'purple|loss|Manov',
    'red|name|gosho',
    'blue|win|Vladko',
    'purple|loss|Yana',
    'purple|name|VladoKaramfilov',
    'blue|age|21',
    'blue|loss|Pesho'
])