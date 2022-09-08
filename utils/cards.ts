export default class Cards {
    deck = [];
    cardNumbers = [
        'A',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'T',
        'J',
        'Q',
        'K',
    ];
    cardTypes = ['H', 'C', 'S', 'D'];

    makeCards() {
        for (let number of this.cardNumbers) {
            for (let type of this.cardTypes) {
                this.deck.push({
                    number,
                    type,
                });
            }
        }
    }

    shuffleCards() {
        this.makeCards();
        let n = this.deck.length;
        for (let i = n - 1; i > 0; i--) {
            let randIdx = Math.floor(Math.random() * i);
            let temp = this.deck[i];
            this.deck[i] = this.deck[randIdx];
            this.deck[randIdx] = temp;
        }
    }
}
