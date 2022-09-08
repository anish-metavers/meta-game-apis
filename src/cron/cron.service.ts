import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op } from 'sequelize';
import Card from '../../utils/cards';
import * as teenPattiScore from 'teenpattisolver';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);

    @Cron('0 */1 * * * *')
    async cronForTeenPatti() {
        try {
            console.log('CRON STARTED');

            // Create a new Shuffled Deck
            let cards = new Card();
            cards.shuffleCards();

            // Check if am Incomplete Game is Available
            let Game = await global.DB.Game.findOne({
                where: {
                    game_status: { [Op.ne]: 'completed' },
                },
                order: [['createdAt', 'DESC']],
            });

            // If Game Exist, We remove the Drawn Cards from our New Deck
            if (Game) {
                let cardsToSkip = [
                    ...Game.player_a_cards,
                    ...Game.player_b_cards,
                ];
                if (cardsToSkip.length > 0)
                    cards.deck = cards.deck.filter((item) => {
                        return !cardsToSkip.includes(
                            `${item.number}${item.type}`,
                        );
                    });
            }

            // If Game does not Exists, Create a new Game object
            if (!Game) {
                const gameObject = {
                    title: 'Regular Teen Patti',
                    game_type: 'regular',
                    player_a_cards: [],
                    player_b_cards: [],
                    current_time: 0,
                    game_status: 'betting',
                };
                Game = await global.DB.Game.create(gameObject);
            }

            // Creating an Interval for 1 Second
            const interval = setInterval(async () => {
                // Updating Timer Count in Game Object
                await Game.update({
                    current_time: Game.current_time + 1,
                });
                let timeCounter = await Game.current_time;

                // Drawing Player A and B Cards One by One
                if (timeCounter >= 21 && timeCounter <= 46) {
                    let tc = timeCounter;
                    let propName =
                        tc === 21 || tc === 31 || tc === 41
                            ? 'player_a_cards'
                            : 'player_b_cards';

                    let indexObj = { 21: 0, 26: 1, 31: 2, 36: 3, 41: 4, 46: 5 };
                    let i = indexObj[tc];

                    if (i === 0 || i) {
                        await Game.update({
                            game_status: `card_drawn_${i + 1}`,
                            [propName]: [
                                ...Game[propName],
                                `${cards.deck[i].number}${cards.deck[i].type}`,
                            ],
                        });
                        console.log(`Draw-${i + 1}`);
                    }
                }

                // Updating Game Status to "Processing Results"
                else if (timeCounter === 51) {
                    await Game.update({
                        game_status: 'processing_result',
                    });
                    console.log('Processing Results');
                }

                // Updating Game Status to "Results Declared"
                else if (timeCounter === 55) {
                    // Calling Cards Compare Function
                    const winnerData = this.compareCards(
                        Game.player_a_cards,
                        Game.player_b_cards,
                    );
                    await Game.update({
                        game_status: 'result_declared',
                        ...winnerData,
                        result_timestamp: Date.now(),
                    });
                    console.log('Declare Results');
                }

                // Updating Game Status to "Completed"
                else if (timeCounter === 59) {
                    await Game.update({
                        game_status: 'completed',
                    });
                    console.log('Game Completed');
                    clearInterval(interval);
                }
            }, 1000);
        } catch (err) {
            console.log('--------------------------------');
            console.log('Error in Game Cron: ' + err.message);
            console.log(err);
            console.log('--------------------------------');
        }
    }

    // Method to Check Who Wins the game
    compareCards(player_a_cards: String[], player_b_cards: String[]) {
        let playerA = teenPattiScore.scoreHandsNormal(player_a_cards);
        let playerB = teenPattiScore.scoreHandsNormal(player_b_cards);

        if (playerA.score > playerB.score)
            return { winner: 'A', win_desc: playerA.desc };
        else if (playerA.score < playerB.score)
            return { winner: 'B', win_desc: playerB.desc };
        else return { winner: 'Draw' };
    }
}
