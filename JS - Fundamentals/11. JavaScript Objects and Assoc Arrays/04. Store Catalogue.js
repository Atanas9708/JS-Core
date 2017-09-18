function storeCatalogue(input) {

    let catalogue = new Map();
    let letters = new Set();

    for (let row of input){

        let splitTokens = row.split(' : ');
        let product = splitTokens[0];
        let price = Number(splitTokens[1]);

        catalogue.set(product, price);

    }

    Array.from(catalogue.keys()).forEach(k => letters.add(k[0]));

    for (let char of Array.from(letters.keys()).sort()){

        console.log(char);

        for (let product of Array.from(catalogue.keys()).sort()){
            if (product.startsWith(char)){
                console.log(`   ${product}: ${catalogue.get(product)}`);
            }
        }
    }

}

storeCatalogue([
'Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10'
])