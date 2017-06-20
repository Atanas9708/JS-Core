function restaurantBill(input) {

    let products = input.filter((e, i) => i % 2 == 0);
    let price = input.filter((e, i) => i % 2 == 1).map(Number);

    console.log(`You purchased ${products.join(', ')} for a total sum of ${price.reduce((a,b) => a + b)}`)
}

restaurantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);