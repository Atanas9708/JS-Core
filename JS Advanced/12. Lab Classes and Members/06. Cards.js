let solve = (function () {
    let Suits = {
        SPADES:'♠',
        HEARTS:'♥',
        DIAMONDS:'♦',
        CLUBS:'♣'
    };

    class Card {
        constructor(face, suit){
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }

        set face(face) {
            if(!Card.validFaces.includes(face)){
                throw new Error('Invalid face');
            }
            this._face = face;
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            if (!Object.keys(Suits).map(k => Suits[k]).includes(suit)){
                throw new Error('Invalid suit');
            }
            this._suit = suit;
        }
        toString(){
            return this.face + this.suit;
        }

        static get validFaces(){
            return Card._validFaces;
        }
    }

    Card._validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    return {Suits, Card};

})();


let c1 = new solve.Card('5', solve.Suits.CLUBS);
console.log(c1.toString());