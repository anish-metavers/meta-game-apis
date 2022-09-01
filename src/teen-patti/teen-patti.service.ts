import { Injectable } from '@nestjs/common';

@Injectable()
export class TeenPattiService {
    getSuffledCards() {
        const cardNumbers = [
            'A',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            'J',
            'Q',
            'K',
        ];
        const cardTypes = ['H', 'C', 'S', 'D'];

        const cardsDeck = cardTypes.flatMap((cardType) => {
            return cardNumbers.map((cardNumber) => {
                return `${cardType}-${cardNumber}`;
            });
        });

        const shuffledDeck = this.shuffleDeck(cardsDeck);

        const player1Cards = shuffledDeck.slice(0, 3);
        const player2Cards = shuffledDeck.slice(3, 6);

        return {
            player1Cards,
            player2Cards,
            shuffledDeck,
            length: shuffledDeck.length,
        };
    }

    shuffleDeck(cardsDeck: String[]): String[] {
        let shuffledDeck = [...cardsDeck];
        let n = shuffledDeck.length;
        for (let i = n - 1; i > 0; i--) {
            let k = Math.floor(Math.random() * i);
            let temp = shuffledDeck[i];
            shuffledDeck[i] = shuffledDeck[k];
            shuffledDeck[k] = temp;
        }
        return shuffledDeck;
    }
}
