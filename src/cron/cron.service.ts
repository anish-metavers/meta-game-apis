import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op, literal } from 'sequelize';
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

                // TO BE REMOVED
                // if (timeCounter === 5) await this.betSimulation(Game);

                // Drawing Player A and B Cards One by One
                if (
                    timeCounter === 21 ||
                    timeCounter === 26 ||
                    timeCounter === 31 ||
                    timeCounter === 36 ||
                    timeCounter === 41 ||
                    timeCounter === 46
                ) {
                    let tc = timeCounter;
                    let propName =
                        tc === 21 || tc === 31 || tc === 41
                            ? 'player_a_cards'
                            : 'player_b_cards';

                    let indexObj = { 21: 0, 26: 1, 31: 2, 36: 3, 41: 4, 46: 5 };
                    let i = indexObj[tc];

                    await Game.update({
                        game_status: `card_drawn_${i + 1}`,
                        [propName]: [
                            ...Game[propName],
                            `${cards.deck[i].number}${cards.deck[i].type}`,
                        ],
                    });
                    console.log(`Draw-${i + 1}`);
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
                    this.checkBets(Game);
                    console.log('Declare Results');
                }

                // Updating Game Status to "Completed" and Clearing the Interval
                else if (timeCounter >= 59) {
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

    async checkBets(Game: any) {
        await global.DB.Bets.update(
            { bet_result: 'win' },
            {
                where: {
                    game_id: Game.id,
                    bet_option: Game.winner,
                },
            },
        );
        await global.DB.Bets.update(
            { bet_result: 'lose' },
            {
                where: {
                    game_id: Game.id,
                    bet_option: { [Op.ne]: Game.winner },
                },
            },
        );

        const bets = await global.DB.Bets.findAll({
            where: {
                game_id: Game.id,
            },
        });

        for (const bet of bets) {
            const user = await global.DB.User.findOne({
                where: {
                    id: bet.user_id,
                },
            });

            const win_amount = bet.amount * bet.bet_odds - bet.amount;
            const wallet_balance_literal =
                bet.bet_result === 'win'
                    ? `wallet_balance + ${win_amount}`
                    : `wallet_balance - ${bet.amount}`;

            await user.update({
                wallet_balance: literal(wallet_balance_literal),
                exposure_balance: literal(`exposure_balance - ${bet.amount}`),
            });
        }
    }

    // Just for Test purposes only
    // async betSimulation(Game: any) {
    //     await Promise.all([
    //         await global.DB.Bets.create({
    //             game_id: Game.id,
    //             user_id: 1,
    //             amount: 100,
    //             bet_option:
    //                 Math.floor(Math.random() * 10) % 2 === 0 ? 'A' : 'B',
    //             bet_odds: 1.97,
    //         }),
    //         await global.DB.User.update(
    //             {
    //                 exposure_balance: literal(`exposure_balance + ${100}`),
    //             },
    //             { where: { id: 1 } },
    //         ),
    //     ]);
    // }

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
