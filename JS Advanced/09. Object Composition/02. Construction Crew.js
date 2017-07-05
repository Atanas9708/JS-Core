function construction(worker) {

    if (worker.handsShaking){
        worker.bloodAlcoholLevel += (worker.weight * 0.1) * worker.experience;
        worker.handsShaking = false;
    }
    return worker;
}

console.log(construction({
        weight: 120,
        experience: 20,
        bloodAlcoholLevel: 200,
        handsShaking: true
    }
));