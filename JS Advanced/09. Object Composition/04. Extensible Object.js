function solve() {

    let myObj = {
        extend: function (template) {
            for (let key in template){
                if (template.hasOwnProperty(key)){
                    let element = template[key];
                    if (typeof  element === 'function'){
                        myObj.__proto__[key] = element;
                    } else {
                        myObj[key] = element;
                    }
                }
            }
        }
    };

    return myObj;
}

let obj = solve();
let template = {
    extendFunc: function () {
        console.log('Hello!');
    },
    extendProp : 'Nasko'
};

obj.extend(template);
console.log(obj);
console.log(Object.getPrototypeOf(obj));

