function calculate(input) {

    let sum = input.reduce((a, b) => a + b);
    let vat = sum * 0.2;
    let total = sum + vat;
    console.log(sum);
    console.log(vat);
    console.log(total);
}

calculate([1.20, 2.60, 3.50]);