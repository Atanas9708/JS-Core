function evenPosition(arr) {

    let result = [];

    for (let i in arr){

        if (i % 2 == 0){

            result.push(arr[i]);
        }
    }

    return result.join(' ');
}

console.log(evenPosition(['20', '30', '40']))