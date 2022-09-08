// import Card from './card';

// class Deck{
//     deck = [];
//     // let types = {
//     //     heart: {
//     //         priority: 3,
//     //     },
//     //     spade: {
//     //         priority: 4,
//     //     },
//     //     diamond: {
//     //         priority: 2,
//     //     },
//     //     club: {
//     //         priority: 1,
//     //     },
//     // };

//     makeCards = function() {
//         let types = ['heart', 'spade', 'diamond', 'club'];
//         for (let type of types) {
//             for (let a = 1; a <= 13; a++) {
//                 this.deck.push(new Card(type, a));
//             }
//         }
//     }
//     // makeCards();

//     getCards = function () {
//         return this.deck;
//     }

//     shuffle = function () {
//         // let len = deck.length;
//         // let tempVal;
//         // let randIdx;
//         // while (0 !== len) {
//         //     randIdx = Math.floor(Math.random() * len);
//         //     len--;
//         //     deck[len].id = Math.random();
//         //     deck[randIdx].id = Math.random();
//         //     tempVal = deck[len];
//         //     deck[len] = deck[randIdx];
//         //     deck[randIdx] = tempVal;
//         // }
//         // let shuffledDeck = [...cardsDeck];

//         let n = deck.length;
//         for (let i = n - 1; i > 0; i--) {
//             let randIdx = Math.floor(Math.random() * i);
//             let temp = deck[i];
//             deck[i] = deck[randIdx];
//             deck[randIdx] = temp;
//         }
//     }

//     return {
//         getCards: getCards,
//         shuffle: shuffle,
//     };
// }

// export default Deck();
