function solve(input) {

    let juices = {};
    let bottles = {};
    for (let row of input){

        let splitTokens = row.split(' => ');
        let fruit = splitTokens[0];
        let quantity = Number(splitTokens[1]);

        if(!juices.hasOwnProperty(fruit)){
            juices[fruit] = 0;
        }

        juices[fruit] += quantity;

        if(juices[fruit] >= 1000){
            bottles[fruit] = parseInt(juices[fruit]/1000);
        }
    }

    for (let key of Object.keys(bottles)){

        console.log(`${key} => ${bottles[key]}`);
    }
}

solve([
    'Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549'
])