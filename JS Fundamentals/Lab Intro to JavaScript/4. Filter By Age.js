function checkAge(minAge ,name1,age1,name2,age2) {

    let obj1 = {name:name1, age:age1};
    let obj2 = {name:name2, age:age2};

    if(minAge <= age1 ){

        console.log(obj1);
    }

    if(minAge <= age2 ){

        console.log(obj2);
    }
}

console.log(checkAge(12, 'Ivan',15, 'Asen',9));