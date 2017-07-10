class Rectangle{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }
    calcArea (width, height){
        return this.width * this.height;
    }
}

let r = new Rectangle(5,4,'blue');
console.log(r.calcArea());