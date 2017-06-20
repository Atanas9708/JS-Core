function split(input) {

    let elements = input.split(/[\s.();,]+/);
    console.log(elements.join('\n'));
}

split('let sum = 4 * 4,b = "wow";');