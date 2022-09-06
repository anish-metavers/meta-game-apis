export default class Card {
    type: any;
    rank: number;
    name: string;
    priority: string;
    suite: string;

    constructor(type: any, rank: number) {
        this.type = type;
        this.rank = rank;
        this.name = this.getName();
        this.priority = this.getPriority();
        this.suite = this.getSuite();
    }

    getSuite() {
        switch (this.type.priority) {
            case 1:
                return 'C';
            case 2:
                return 'D';
            case 3:
                return 'H';
            case 4:
                return 'S';
        }
    }

    getName = function () {
        switch (this.rank) {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return this.rank.toString();
        }
    };

    getPriority = function () {
        switch (this.rank) {
            case 1:
                return 14;
            default:
                return this.rank;
        }
    };
}
