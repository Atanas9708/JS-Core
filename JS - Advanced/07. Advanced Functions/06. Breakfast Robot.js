let solve = function () {

    let inventory = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    let products = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        coke: {
            carbohydrate: 10,
            flavour: 20
        },
        cheverme: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        },
        omlet: {
            protein: 5,
            fat: 1,
            flavour: 1
        }
    };

    return function (args) {

        let splitTokens = args.split(' ');
        let order = splitTokens[0];

        if (order === 'restock'){
            let recipe = splitTokens[1];
            let quantity = Number(splitTokens[2]);
            inventory[recipe] += quantity;
            return 'Success';
        }

        else if (order === 'prepare'){
            let recipe = splitTokens[1];
            let quantity = Number(splitTokens[2]);
            let selectedProduct = products[recipe];

            for (let microElem in selectedProduct){
               if(selectedProduct.hasOwnProperty(microElem)){
                   let microElemQuantity = selectedProduct[microElem];
                   if(inventory[microElem] < microElemQuantity * quantity){
                       return `Error: not enough ${microElem} in stock`;
                   }
               }
            }

                for (let microElem in selectedProduct){
                    if(selectedProduct.hasOwnProperty(microElem)){
                        let microElemQuantity = selectedProduct[microElem];
                        inventory[microElem] -= microElemQuantity * quantity;
                    }
                }
                return 'Success';
        }

        else if (order === 'report'){
            return `protein=${inventory.protein} carbohydrate=${inventory.carbohydrate} fat=${inventory.fat} flavour=${inventory.flavour}`;
        }
    }
};

solve("restock flavour 50");
solve("restock protein 30");
solve("restock fat 20");
solve("restock carbohydrate 50");
solve('report');


