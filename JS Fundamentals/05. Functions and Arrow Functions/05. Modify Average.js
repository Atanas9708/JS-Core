function modifyAverage(num) {

    let numAsStr = num.toString();
    let sum = sumDigits(numAsStr);

    while (sum / numAsStr.length <= 5 ){

        numAsStr += '9';
        sum = sumDigits(numAsStr);
    }


    function sumDigits(numAsStr) {
        let sum = 0;
        for(let digit of numAsStr){
            sum += Number(digit);
        }
        return sum;
    }

    console.log(numAsStr);
}

modifyAverage(101);