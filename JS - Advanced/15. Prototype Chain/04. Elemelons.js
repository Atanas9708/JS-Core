function solve() {

    class Melon {
        constructor(weight, melonString) {
            if (new.target === Melon) {
                throw new Error('Cannot instantiate Melon');
            }
            this.weight = Number(weight);
            this.melonString = melonString;
            this.element = '';
            this._elementIndex = this.weight * this.melonString.length;
        };

        get elementIndex() {
            return this._elementIndex;
        }

        toString() {
            return `Element: ${this.element}\nSort: ${this.melonString}\nElement Index: ${this.elementIndex}`;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonString) {
            super(weight, melonString);
            this.element = 'Water';
        }

    }

    class Firemelon extends Melon {
        constructor(weight, melonString) {
            super(weight, melonString);
            this.element = 'Fire';
        }

    }

    class Earthmelon extends Melon {
        constructor(weight, melonString) {
            super(weight, melonString);
            this.element = 'Earth';
        }

    }

    class Airmelon extends Melon {
        constructor(weight, melonString) {
            super(weight, melonString);
            this.element = 'Air';
        }

    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonString) {
            super(weight, melonString);
            this.element = 'Water';
            this.elements = ['Fire', 'Earth', 'Air', 'Water'];
            this.index = 0;
        }

        morph() {
            this.element = this.elements[this.index++ % 4];
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    };
}

let melon = solve();

let watermelon = new melon.Watermelon(5, 'red');
console.log(watermelon.toString());

let firemelon  = new melon.Firemelon(3, 'blue');
console.log(firemelon.toString());

let earthlemon = new melon.Earthmelon(5, 'green');
console.log(earthlemon.toString());

let airlemon = new melon.Airmelon(4, 'yellow');
console.log(airlemon.toString());

let melolemonmelon = new melon.Melolemonmelon(3, 'silver');
melolemonmelon.morph();
melolemonmelon.morph();
melolemonmelon.morph();
console.log(melolemonmelon.toString());