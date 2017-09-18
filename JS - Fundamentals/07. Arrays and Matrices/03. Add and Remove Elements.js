function addRemove(input) {

    let arr = [];
    let num = 1;

    for (let command of input){

        if (command == 'add'){

            arr.push(num);
        } else {

            arr.pop();
        }

        num++;
    }

    if (arr.length == 0){

        console.log('Empty');
    } else {

        arr.forEach(e => console.log(e));
    }
}

addRemove('add','add', 'remove', 'add', 'add');