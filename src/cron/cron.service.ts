import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CardConfig } from 'utils/config';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);

    // @Cron('0 */2 * * * *')
    async cronForTeenPatti() {
        console.log('CRON STARTED');
        // Initialize New Game

        const gameObject = {
            title: 'Regular Teen Patti',
            game_type: 'regular',
            player_a_cards: [],
            player_b_cards: [],
            current_time: 0,
            game_status: 'betting',
        };

        const Game = await global.DB.Game.create(gameObject);
        const drawCard = this.shuffleDeck();

        let timeCounter = 0;
        const interval = setInterval(async () => {
            timeCounter += 1;
            // console.log('Timer Counter: ', timeCounter);
            await Game.update({
                current_time: timeCounter,
            });

            if (timeCounter === 21) {
                console.time('t1');
                await Game.update({
                    game_status: 'card_drawn_1',
                    player_a_cards: [...Game.player_a_cards, drawCard()],
                });
                console.log('Draw-1');
                console.timeEnd('t1');
            } else if (timeCounter === 26) {
                await Game.update({
                    game_status: 'card_drawn_2',
                    player_b_cards: [...Game.player_b_cards, drawCard()],
                });
                console.log('Draw-2');
            } else if (timeCounter === 31) {
                await Game.update({
                    game_status: 'card_drawn_3',
                    player_a_cards: [...Game.player_a_cards, drawCard()],
                });
                console.log('Draw-3');
            } else if (timeCounter === 36) {
                await Game.update({
                    game_status: 'card_drawn_4',
                    player_b_cards: [...Game.player_b_cards, drawCard()],
                });
                console.log('Draw-4');
            } else if (timeCounter === 41) {
                await Game.update({
                    game_status: 'card_drawn_5',
                    player_a_cards: [...Game.player_a_cards, drawCard()],
                });
                console.log('Draw-5');
            } else if (timeCounter === 46) {
                await Game.update({
                    game_status: 'card_drawn_6',
                    player_b_cards: [...Game.player_b_cards, drawCard()],
                });
                console.log('Draw-6');
            } else if (timeCounter === 51) {
                await Game.update({
                    game_status: 'processing_result',
                });
                console.log('Processing Results');
            } else if (timeCounter === 55) {
                await Game.update({
                    game_status: 'result_declared',
                });
                console.log('Declare Results');
            } else if (timeCounter === 59) {
                clearInterval(interval);
            }
        }, 1000);
    }

    // 0-20 : Betting
    // 21-25 : Draw-1
    // 26-30 : Draw-2
    // 31-35 : Draw-3
    // 36-40 : Draw-4
    // 41-45 : Draw-5
    // 46-50 : Draw-6
    // 51-55 : Processing Results
    // 56-59 : Declare Results

    // @Cron('1-59 * * * * *')
    // async test() {
    //     this.logger.log('TEST CRON');
    // }

    shuffleDeck() {
        // const cardNumbers = [
        //     'A',
        //     '2',
        //     '3',
        //     '4',
        //     '5',
        //     '6',
        //     '7',
        //     '8',
        //     '9',
        //     '10',
        //     'J',
        //     'Q',
        //     'K',
        // ];
        // const cardTypes = ['H', 'C', 'S', 'D'];

        // const cardsDeck = cardTypes.flatMap((cardType) => {
        //     return cardNumbers.map((cardNumber) => {
        //         return `${cardType}-${cardNumber}`;
        //     });
        // });
        const cardsDeck = CardConfig.CARD_DECK;
        let shuffledDeck = [...cardsDeck];
        let n = shuffledDeck.length;
        for (let i = n - 1; i > 0; i--) {
            let k = Math.floor(Math.random() * i);
            let temp = shuffledDeck[i];
            shuffledDeck[i] = shuffledDeck[k];
            shuffledDeck[k] = temp;
        }
        let newShuffledDeck = [...shuffledDeck];
        return function () {
            return newShuffledDeck.pop();
        };
    }
}
