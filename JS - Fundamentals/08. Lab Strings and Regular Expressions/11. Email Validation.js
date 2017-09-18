function valid(email) {

    let pattern = /^[a-zA-Z0-9]+@[a-z]+(\.[a-z]+)+$/g;

    console.log(pattern.test(email) ? 'Valid' : 'Invalid');
}
valid('invalid@emai1.bg');