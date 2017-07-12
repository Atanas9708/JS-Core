function solve() {

    class Figure {
        constructor() {
            if (new.target === Figure) {
                throw new TypeError('Nope,cannot do that!');
            }
        }

        get area() {
            switch (this.constructor) {
                case Circle:
                    return Math.PI * this.radius * this.radius;
                case Rectangle:
                    return this.width * this.height;
            }
        }

        toString() {
            let type = this.constructor.name;
            let props = Object.getOwnPropertyNames(this);
            return type + ' - ' + props.map(p => `${p}: ${this[p]}`).join(', ');
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height) {
            super();
            this.width = width;
            this.height = height;
        }
    }

    return{
        Figure,
        Circle,
        Rectangle
    };
}

let circle = new Circle(5);
console.log(circle);
console.log(circle.area);

let rectangle = new Rectangle(8, 5);
console.log(rectangle);
console.log(rectangle.area);