// export default class Card {
//     type: String;
//     rank: Number;
//     name: String;
//     priority: Number;
//     suite: String;

//     constructor(type: String, rank: Number) {
//         this.type = type;
//         this.rank = rank;
//         this.name = this.getName();
//         this.priority = this.getPriority();
//         this.suite = type[0].toUpperCase();
//     }

//     getName = function (): String {
//         switch (this.rank) {
//             case 1:
//                 return 'A';
//             case 11:
//                 return 'J';
//             case 12:
//                 return 'Q';
//             case 13:
//                 return 'K';
//             default:
//                 return this.rank.toString();
//         }
//     };

//     getPriority = function (): Number {
//         switch (this.rank) {
//             case 1:
//                 return 14;
//             default:
//                 return this.rank;
//         }
//     };
// }
