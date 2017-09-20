function spice(input) {

    let startingYield = Number(input);
    let days = 0;
    let yield = 0;
    while (startingYield >= 100){

        days++;
        yield += startingYield;
        startingYield -=10;
        yield-=26;
    }

    if(days > 0){
        yield -= 26;
    }

    console.log(days);
    console.log(yield);
}

spice('111');