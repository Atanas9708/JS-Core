function factory(input) {

    let car = {
        model: input.model
    };

    let power = input.power;
    if (power <= 90){
        car.engine = {
            power: 90,
            volume: 1800
        }
    } else if (power > 90 && power <= 120){
        car.engine = {
            power: 120,
            volume: 2400
        }
    } else {
        car.engine = {
            power: 200,
            volume: 3500
        }
    }

    let carriageType = input.carriage;
    switch (carriageType){
        case 'hatchback':
            car.carriage = {
                type: 'hatchback'
            };
            break;
        case 'coupe':
            car.carriage = {
                type: 'coupe'
            };
    }
    car.carriage.color = input.color;

    let wheelsize = input.wheelsize;
    if (wheelsize % 2 === 0){
        wheelsize -= 1;
    }
    car.wheels = [wheelsize, wheelsize, wheelsize, wheelsize];

    return car;
}

console.log(factory({
        model: 'Opel Vectra',
        power: 110,
        color: 'grey',
        carriage: 'coupe',
        wheelsize: 17
    }
));

