function sumTown(arr) {

    let towns = {};
    for (let i = 0; i < arr.length; i+=2){

        let town = arr[i];
        let sum = Number(arr[i + 1]);
        if (!towns.hasOwnProperty(town)){
            towns[town] = 0;
        }
        towns[town] += sum;
    }
    console.log(JSON.stringify(towns));
}

sumTown([
    'Sofia',
    '20',
    'Varna',
    '3',
    'Sofia',
    '5',
    'Varna',
    '4'
])

