function lowestPriceInCities(input) {

    let map = new Map();

    for (let row of input){

        let inputTokens = row.split(' | ');
        let town = inputTokens[0];
        let product = inputTokens[1];
        let price = Number(inputTokens[2]);

        if(!map.has(product)){
            map.set(product, new Map());
        }

        map.get(product).set(town, price);
    }

    for (let [product, innerMap] of map){

        let lowestPrice = Number.POSITIVE_INFINITY;
        let townLowestPrice = '';
        for (let [town, price] of innerMap){

            if (price < lowestPrice){
                lowestPrice = price;
                townLowestPrice = town;
            }
        }

        console.log(`${product} -> ${lowestPrice} (${townLowestPrice})`);
    }
}

lowestPriceInCities([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'
])