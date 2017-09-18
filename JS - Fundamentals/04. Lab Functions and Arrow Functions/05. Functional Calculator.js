function calculator(a,b,operator) {

    switch (operator){

        case '+': add(a,b,operator);
            break;
        case '-': subtract(a,b,operator);
            break;
        case '*': multiply(a,b,operator);
            break;
        case '/': devide(a,b,operator);
            break;

    }

    function add(a,b,operator) {

        console.log(a + b);
    }

    function subtract(a,b,operator) {

        console.log(a - b);
    }

    function multiply(a,b,operator) {

        console.log(a * b);
    }

    function devide(a,b,operator) {

        console.log(a / b);
    }
}

(calculator(2,2,'+'));
(calculator(2,2,'-'));
(calculator(2,2,'*'));
(calculator(2,2,'/'));