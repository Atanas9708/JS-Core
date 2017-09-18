function negativeOrPositive(arr) {

    let result = [];

    for (let num of arr){

        if(num < 0){

            result.unshift(num);
        } else {

            result.push(num);
        }
    }

    return result.join('\n');
}

console.log(negativeOrPositive([7, -2, 8, 9]));