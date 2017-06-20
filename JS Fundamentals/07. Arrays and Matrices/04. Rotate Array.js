function rotate(input) {

    let count = Number(input.pop());
    count %= input.length;

    for (let i = 0; i < count; i++){

        let lastElem = input.pop();
        input.unshift(lastElem);
    }

    console.log(input.join(' '));
}

console.log(rotate(1, 2, 3, 4, 2));