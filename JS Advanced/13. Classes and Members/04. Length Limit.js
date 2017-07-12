class Stringer {
    constructor(innerString, innerLength){
        this.innerString = innerString;
        this.innnerLength = innerLength;
        this._innerLength = innerLength;
    }

    get innerLength() {
        return this._innerLength;
    }

    set innerLength(value) {
        if(value < 0){
            this._innerLength = 0;
        } else {
            this._innerLength = value;
        }
    }

    increase(length){
        this.innerLength += length;
    }

    decrease(length){
        this.innerLength -= length;
    }

    toString(){
        if(this.innerString.length < this.innerLength){
            return this.innerString;
        } else {
            return this.innerString.substring(0, this.innerLength) + '...';
        }
    }
}
let test = new Stringer("Test", 5);
console.log(test.toString());

test.decrease(3);
console.log(test.toString());
