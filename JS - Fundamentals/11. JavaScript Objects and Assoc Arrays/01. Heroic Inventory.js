function heroicInventory(input) {

    let heros = [];

    for (let row of input){

        let splitTokens = row.split(' / ');
        let name = splitTokens[0];
        let level = Number(splitTokens[1]);
        let items = [];

        if (splitTokens.length > 2){

            items = splitTokens[2].split(', ');
        }

        let hero = {

            name: name,
            level:level,
            items:items
        }

        heros.push(hero);
    }

    console.log(JSON.stringify(heros));
}

heroicInventory([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
])