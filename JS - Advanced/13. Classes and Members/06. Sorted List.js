class List {
    constructor(){
        this.arr = [];
        this.size = 0;
    }
    add(element){
        this.arr.push(element);
        this.size++;
        this.arr = this.arr.sort((a, b) => a - b);
    }
    remove(index){
        if (index >= 0 && index < this.arr.length){
            this.arr.splice(index, 1);
            this.size--;
            this.arr = this.arr.sort((a, b) => a - b);
        }
    }
    get(index){
        if (index >= 0 && index < this.arr.length){
            return this.arr[index];
        }
    }
}

let test = new List([1,2,3,4]);
test.add(5);
test.remove(4);
console.log(test);

