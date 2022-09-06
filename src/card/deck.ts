import Card from './card';

function Deck() {
    let deck = [];
    let types = {
        heart: {
            priority: 3,
        },
        spade: {
            priority: 4,
        },
        diamond: {
            priority: 2,
        },
        club: {
            priority: 1,
        },
    };

    function makeCards() {
        for (let type in types) {
            for (let a = 1; a <= 13; a++) {
                deck.push(new Card(type, a));
            }
        }
    }
    makeCards();

    function getCards() {
        return deck;
    }

    function getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min, 0);
    }

    function shuffle() {
        let len = deck.length,
            tempVal,
            randIdx;
        while (0 !== len) {
            randIdx = Math.floor(Math.random() * len);
            len--;
            deck[len].id = Math.random();
            deck[randIdx].id = Math.random();
            tempVal = deck[len];
            deck[len] = deck[randIdx];
            deck[randIdx] = tempVal;
        }
    }

    // function getRandomCards(num) {
    //     let randCards = [];
    //     let cardInserted = {},
    //         nCard = null;
    //     for (let count = 1; count <= num; ) {
    //         nCard = getRandomArbitrary(1, 52);
    //         if (!cardInserted[nCard]) {
    //             randCards.push(
    //                 $.extend(
    //                     {
    //                         id: Math.random(),
    //                     },
    //                     deck[nCard - 1],
    //                 ),
    //             );
    //             cardInserted[nCard] = true;
    //             count++;
    //         }
    //     }
    //     return randCards;
    // }

    return {
        getCards: getCards,
        // getRandomCards: getRandomCards,
        shuffle: shuffle,
    };
}

export default Deck();
