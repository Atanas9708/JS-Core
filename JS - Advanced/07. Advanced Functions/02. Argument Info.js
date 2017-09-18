function solve() {

    let argumentType = {};

    for (let i = 0; i < arguments.length; i++){
        let argument = arguments[i];
        console.log(`${typeof argument}: ${argument}`);

        if (!argumentType.hasOwnProperty(typeof argument)){
            argumentType[typeof argument] = 0;
        }
        argumentType[typeof argument]++;
    }

    let sortedArr = [];

    for (let arg in argumentType){
        if(argumentType.hasOwnProperty(arg)){
            let argumentValue = argumentType[arg];
            sortedArr.push([arg, argumentValue]);
        }
    }

    sortedArr = sortedArr.sort((a, b) => {
        return b[1] - a[1];
    });

    for (let elem of sortedArr){
        console.log(`${elem[0]} = ${elem[1]}`);
    }
}

solve('cat', 42, function () { console.log('Hello world!'); });