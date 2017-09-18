class Circle {
    constructor(radius){
        this.radius = radius;
    }
    get diameter(){
        return this.radius * 2;
    }
    set diameter(diameter){
        return this.radius = diameter / 2;
    }
    get area(){
        return Math.PI * this.radius * this.radius;
    }
}

let c = new Circle(1.6);
console.log(c.radius);