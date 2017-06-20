function numbers(number){

    let numberToInt = Number(number);
    let str = '';

    for(let i = 1; i <= numberToInt; i++){

        str += i;
    }

    return str;
}
console.log(numbers('11'));