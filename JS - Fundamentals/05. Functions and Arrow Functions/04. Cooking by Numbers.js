function cookingByNumbers(input) {

    let num = Number(input[0]);

    let chop = x => x/2;
    let dice = x => Math.sqrt(x);
    let spice = x => ++x;
    let bake = x => x*3;
    let fillet = x => x - (x*0.2);

    for (let i = 1; i <=5; i++){

        switch (input[i]){

            case 'chop': num = chop(num);
                console.log(num);
                break;
            case 'dice': num = dice(num);
                console.log(num);
                break;
            case 'spice': num = spice(num);
                console.log(num);
                break;
            case 'bake': num = bake(num);
                console.log(num);
                break;
            case 'fillet': num = fillet(num);
                console.log(num);
                break;
        }
    }

}

cookingByNumbers([9,'chop, chop, chop, chop, chop']);