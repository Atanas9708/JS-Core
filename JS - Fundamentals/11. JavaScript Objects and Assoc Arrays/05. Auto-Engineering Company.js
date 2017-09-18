function company(input) {

    let map = new Map();

    for (let row of input){

        let splitTokens = row.split(' | ');
        let brand = splitTokens[0];
        let model = splitTokens[1];
        let producedCars = Number(splitTokens[2]);

        if(!map.has(brand)){
            map.set(brand, new Map());
        }

        if(!map.get(brand).get(model)){
            map.get(brand).set(model,0);
        }
        map.get(brand).set(model, map.get(brand).get(model) + producedCars);
    }

    for (let [brand, modelCount] of map){

        console.log(brand);

        for (let [model, count] of modelCount){

            console.log(`###${model} -> ${count}`)
        }
    }
}

company([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
])