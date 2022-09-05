import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);

    @Cron('1 * * * * *')
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

        let timeCounter = 0;
        const interval = setInterval(async () => {
            timeCounter += 1;
            // console.log('Timer Counter: ', timeCounter);
            await Game.update({
                current_time: timeCounter,
            });

            if (timeCounter === 21) {
                await Game.update({
                    game_status: 'card_drawn_1',
                });
                console.log('Draw-1');
            } else if (timeCounter === 26) {
                await Game.update({
                    game_status: 'card_drawn_2',
                });
                console.log('Draw-2');
            } else if (timeCounter === 31) {
                await Game.update({
                    game_status: 'card_drawn_3',
                });
                console.log('Draw-3');
            } else if (timeCounter === 36) {
                await Game.update({
                    game_status: 'card_drawn_4',
                });
                console.log('Draw-4');
            } else if (timeCounter === 41) {
                await Game.update({
                    game_status: 'card_drawn_5',
                });
                console.log('Draw-5');
            } else if (timeCounter === 46) {
                await Game.update({
                    game_status: 'card_drawn_6',
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
}
