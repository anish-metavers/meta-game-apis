// let _ = require('underscore');

// export default class CardCompare {
//     static _options = {
//         winingPriority: {
//             cardType: {
//                 spade: {
//                     priority: 4,
//                 },
//                 heart: {
//                     priority: 3,
//                 },
//                 diamond: {
//                     priority: 2,
//                 },
//                 club: {
//                     priority: 1,
//                 },
//             },
//             setType: {
//                 highcard: {
//                     type: 'highcard',
//                     displayName: 'High Card',
//                     priority: 1,
//                 },
//                 pair: {
//                     type: 'pair',
//                     displayName: 'Pair',
//                     priority: 2,
//                 },
//                 color: {
//                     type: 'color',
//                     displayName: 'Color',
//                     priority: 3,
//                 },
//                 sequence: {
//                     type: 'sequence',
//                     displayName: 'Sequence',
//                     priority: 4,
//                 },
//                 puresequence: {
//                     type: 'puresequence',
//                     displayName: 'Pure Sequence',
//                     priority: 5,
//                 },
//                 trail: {
//                     type: 'trail',
//                     displayName: 'Trail',
//                     priority: 6,
//                 },
//             },
//         },
//     };

//     static isTrail = function (cardSet) {
//         return (
//             cardSet[0].rank === cardSet[1].rank &&
//             cardSet[2].rank === cardSet[0].rank
//         );
//     };

//     static isPureSeq = function (cardSet) {
//         let sorted = _.sortBy(cardSet, 'priority');
//         let sortedRank = _.sortBy(cardSet, 'rank');
//         return (
//             ((sorted[0].priority + 1 === sorted[1].priority &&
//                 sorted[1].priority + 1 === sorted[2].priority) ||
//                 (sortedRank[0].rank + 1 === sortedRank[1].rank &&
//                     sortedRank[1].rank + 1 === sortedRank[2].rank)) &&
//             sorted[0].type === sorted[1].type &&
//             sorted[1].type === sorted[2].type
//         );
//     };

//     static isSeq = function (cardSet) {
//         let sorted = _.sortBy(cardSet, 'priority');
//         let sortedRank = _.sortBy(cardSet, 'rank');
//         return (
//             (sorted[0].priority + 1 === sorted[1].priority &&
//                 sorted[1].priority + 1 === sorted[2].priority) ||
//             (sortedRank[0].rank + 1 === sortedRank[1].rank &&
//                 sortedRank[1].rank + 1 === sortedRank[2].rank)
//         );
//     };

//     static isColor = function (cardSet) {
//         return (
//             cardSet[0].type === cardSet[1].type &&
//             cardSet[1].type === cardSet[2].type
//         );
//     };

//     static isPair = function (cardSet) {
//         return (
//             cardSet[0].rank === cardSet[1].rank ||
//             cardSet[1].rank === cardSet[2].rank ||
//             cardSet[0].rank === cardSet[2].rank
//         );
//     };

//     static getSetType = function (cardSet) {
//         if (CardCompare.isTrail(cardSet)) {
//             return CardCompare._options.winingPriority.setType.trail;
//         }
//         if (CardCompare.isPureSeq(cardSet)) {
//             return CardCompare._options.winingPriority.setType.puresequence;
//         }
//         if (CardCompare.isSeq(cardSet)) {
//             return CardCompare._options.winingPriority.setType.sequence;
//         }
//         if (CardCompare.isColor(cardSet)) {
//             return CardCompare._options.winingPriority.setType.color;
//         }
//         if (CardCompare.isPair(cardSet)) {
//             return CardCompare._options.winingPriority.setType.pair;
//         }
//         return CardCompare._options.winingPriority.setType.highcard;
//     };

//     static compareTrail = function (sets, setProp) {
//         console.log('SETS', sets);

//         let result = _.max(sets, function (obj) {
//             console.log('OBJ', obj[setProp][0].priority);

//             return obj[setProp][0].priority;
//         });
//         return result;
//     };

//     static isHighSet = function (set1, set2) {
//         let set1D = _.sortBy(set1, 'priority').reverse();
//         let set2D = _.sortBy(set2, 'priority').reverse();
//         if (set1D[0].priority > set2D[0].priority) {
//             return true;
//         } else if (set1D[0].priority < set2D[0].priority) {
//             return false;
//         } else {
//             if (set1D[1].priority > set2D[1].priority) {
//                 return true;
//             } else if (set1D[1].priority < set2D[1].priority) {
//                 return false;
//             } else {
//                 if (set1D[2].priority > set2D[2].priority) {
//                     return true;
//                 } else if (set1D[2].priority < set2D[2].priority) {
//                     return false;
//                 } else {
//                     return (
//                         CardCompare._options.winingPriority.cardType[
//                             set1D[2].type
//                         ].priority >
//                         CardCompare._options.winingPriority.cardType[
//                             set2D[2].type
//                         ].priority
//                     );
//                 }
//             }
//         }
//     };

//     // static compareHighCard = function (sets, setProp = 'set') {
//     //     let highSet = sets[0];
//     //     for (let count = 1; count < sets.length; count++) {
//     //         let set2 = sets[count];
//     //         if (CardCompare.isHighSet(set2[setProp], highSet[setProp])) {
//     //             highSet = set2;
//     //         }
//     //     }
//     //     return highSet;
//     // };

//     // static isHighColor = function (set1, set2) {
//     //     let set1D = _.sortBy(set1, 'priority').reverse();
//     //     let set2D = _.sortBy(set2, 'priority').reverse();
//     //     if (set1D[0].priority > set2D[0].priority) {
//     //         return true;
//     //     } else if (set1D[0].priority < set2D[0].priority) {
//     //         return false;
//     //     } else {
//     //         if (set1D[1].priority > set2D[1].priority) {
//     //             return true;
//     //         } else if (set1D[1].priority < set2D[1].priority) {
//     //             return false;
//     //         } else {
//     //             if (set1D[2].priority > set2D[2].priority) {
//     //                 return true;
//     //             } else if (set1D[2].priority < set2D[2].priority) {
//     //                 return false;
//     //             } else {
//     //                 return (
//     //                     CardCompare._options.winingPriority.cardType[
//     //                         set1D[2].type
//     //                     ].priority >
//     //                     CardCompare._options.winingPriority.cardType[
//     //                         set2D[2].type
//     //                     ].priority
//     //                 );
//     //             }
//     //         }
//     //     }
//     // };

//     // static compareColor = function (sets, setProp = 'set') {
//     //     let highSet = sets[0];
//     //     for (let count = 1; count < sets.length; count++) {
//     //         let set2 = sets[count];
//     //         if (CardCompare.isHighSet(set2[setProp], highSet[setProp])) {
//     //             highSet = set2;
//     //         }
//     //     }
//     //     return highSet;
//     // };

//     static getPairRank = function (set) {
//         if (set[0].priority === set[1].priority) {
//             return set[0].priority;
//         } else if (set[1].priority === set[2].priority) {
//             return set[1].priority;
//         } else if (set[0].priority === set[2].priority) {
//             return set[0].priority;
//         }
//         return -1; 
//     };

//     static getOddCardForPair = function (set) {
//         if (set[0].priority === set[1].priority) {
//             return set[2];
//         } else if (set[1].priority === set[2].priority) {
//             return set[0];
//         } else if (set[0].priority === set[2].priority) {
//             return set[1];
//         }
//     };

//     static isHighPair = function (set1, set2) {
//         let pair1Rank = CardCompare.getPairRank(set1);
//         let pair2Rank = CardCompare.getPairRank(set2);
//         let last1Card = CardCompare.getOddCardForPair(set1);
//         let last2Card = CardCompare.getOddCardForPair(set2);
//         if (pair1Rank > pair2Rank) {
//             return true;
//         } else if (pair1Rank < pair2Rank) {
//             return false;
//         } else {
//             if (last1Card.priority > last2Card.priority) {
//                 return true;
//             } else if (last1Card.priority < last2Card.priority) {
//                 return false;
//             } else {
//                 return (
//                     CardCompare._options.winingPriority.cardType[last1Card.type]
//                         .priority >
//                     CardCompare._options.winingPriority.cardType[last2Card.type]
//                         .priority
//                 );
//             }
//         }
//     };

//     static comparePair = function (sets, setProp = 'set') {
//         let highSet = sets[0];
//         for (let count = 1; count < sets.length; count++) {
//             let set2 = sets[count];
//             if (CardCompare.isHighPair(set2[setProp], highSet[setProp])) {
//                 highSet = set2;
//             }
//         }
//         return highSet;
//     };

//     // static isHighSequence = function (set1, set2) {
//     //     let set1D = _.sortBy(set1, 'priority').reverse();
//     //     let set2D = _.sortBy(set2, 'priority').reverse();
//     //     if (set1D[0].priority > set2D[0].priority) {
//     //         return true;
//     //     } else if (set1D[0].priority < set2D[0].priority) {
//     //         return false;
//     //     } else {
//     //         if (set1D[1].priority > set2D[1].priority) {
//     //             return true;
//     //         } else if (set1D[1].priority < set2D[1].priority) {
//     //             return false;
//     //         } else {
//     //             if (set1D[2].priority > set2D[2].priority) {
//     //                 return true;
//     //             } else if (set1D[2].priority < set2D[2].priority) {
//     //                 return false;
//     //             } else {
//     //                 return (
//     //                     CardCompare._options.winingPriority.cardType[
//     //                         set1D[2].type
//     //                     ].priority >
//     //                     CardCompare._options.winingPriority.cardType[
//     //                         set2D[2].type
//     //                     ].priority
//     //                 );
//     //             }
//     //         }
//     //     }
//     //     return true;
//     // };

//     static compareSet = function (sets, setProp = 'set') {
//         let highSet = sets[0];
//         for (let count = 1; count < sets.length; count++) {
//             let set2 = sets[count];
//             if (CardCompare.isHighSet(set2[setProp], highSet[setProp])) {
//                 highSet = set2;
//             }
//         }
//         return highSet;
//     };

//     static getGreatestFromType = function (
//         type: String,
//         sets,
//         setProp = 'set',
//     ) {
//         switch (type) {
//             case 'trail':
//                 return CardCompare.compareTrail(sets, setProp);
//             case 'pair':
//                 return CardCompare.comparePair(sets, setProp);
//             case 'highcard':
//                 // return CardCompare.compareHighCard(sets, setProp);
//             case 'color':
//                 // return CardCompare.compareColor(sets, setProp);
//             case 'sequence':
//             case 'puresequence':
//                 return CardCompare.compareSet(sets, setProp);
//         }
//         return sets[0];
//     };

//     static getGreatest = function (sets, setProp = 'set') {
//         let arrNew = [];
//         let maxP = -1;

//         for (let count = 0; count < sets.length; count++) {
//             let setType = CardCompare.getSetType(sets[count][setProp]);
//             sets[count].type = setType.type;
//             sets[count].typeName = setType.displayName;
//             arrNew.push({
//                 type: setType.type,
//                 typeName: setType.displayName,
//                 priority: setType.priority,
//                 set: sets[count],
//             });
//         }
//         const sorted = _.sortBy(arrNew, 'priority').reverse();
//         maxP = sorted[0].priority;
//         let typeLeft = _.where(sorted, {
//             priority: maxP,
//         });
//         if (typeLeft.length > 1) {
//             return CardCompare.getGreatestFromType(
//                 typeLeft[0].type,
//                 _.map(typeLeft, function (a) {
//                     return a.set;
//                 }),
//             );
//         }
//         return sorted[0].set;
//     };
// }
