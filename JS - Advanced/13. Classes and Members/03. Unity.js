class Rat {
    constructor(name){
        this.name = name;
        this.rats = [];
    }
    unite(otherRat){
        if (otherRat instanceof Rat){
            this.rats.push(otherRat);
        }
    }
    getRats(){
       return this.rats;
    }
    toString(){
       let resultRats = this.name + '\n';
       for (let rat of this.rats){
           resultRats += `##${rat.name}\n`;
       }

       return resultRats.trim();
    }
}

let test = new Rat("Pesho");
console.log(test.toString());

console.log(test.getRats());

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));
console.log(test.getRats());

console.log(test.toString());

