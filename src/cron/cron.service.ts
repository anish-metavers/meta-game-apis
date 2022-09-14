import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op, literal } from 'sequelize';
import Card from '../../utils/cards';
import * as teenPattiScore from 'teenpattisolver';

@Injectable()
export class CronService {
    private readonly logger = new Logger('TeenPattiCron');

    private Game = null;
    private Timer = 0;
    private cards = new Card(true);

    @Cron('*/1 * * * * *')
    async cronForTeenPatti() {
        try {
            // Create a new Shuffled Deck
            // let cards = new Card();
            // cards.shuffleCards();

            if (!this.Game) {
                // Game is Null

                // Check if am Incomplete Game is Available
                let oldGame = await global.DB.Game.findOne({
                    where: {
                        game_status: { [Op.ne]: 'completed' },
                    },
                    order: [['createdAt', 'DESC']],
                });
                // If Game Exist, We remove the Drawn Cards from our New Deck
                if (oldGame) {
                    let cardsToSkip = [
                        ...oldGame.player_a_cards,
                        ...oldGame.player_b_cards,
                    ];
                    if (cardsToSkip.length > 0)
                        this.cards.deck = this.cards.deck.filter((item) => {
                            return !cardsToSkip.includes(
                                `${item.number}${item.type}`,
                            );
                        });
                    this.Game = oldGame;
                }
                // If Game does not Exists, Create a new Game object
                else if (!oldGame) {
                    this.Game = await global.DB.Game.create({
                        title: 'Regular Teen Patti',
                        game_type: 'regular',
                        player_a_cards: [],
                        player_b_cards: [],
                        current_time: 0,
                        game_status: 'betting',
                    });
                }

                this.Timer = this.Game.current_time;
            }

            // Updating Timer Count in Game Object
            await this.Game.update({
                current_time: ++this.Timer,
            });

            this.logger.debug('--------------------');
            this.logger.debug(`Game Id: ${this.Game.id} Timer: ${this.Timer}`);

            // TO BE REMOVED
            // if (timeCounter === 5) await this.betSimulation(Game, 'A');
            // if (timeCounter === 6) await this.betSimulation(Game, 'B');

            // Drawing Player A and B Cards One by One
            if (
                this.Timer === 21 ||
                this.Timer === 26 ||
                this.Timer === 31 ||
                this.Timer === 36 ||
                this.Timer === 41 ||
                this.Timer === 46
            ) {
                let tc = this.Timer;
                let propName =
                    tc === 21 || tc === 31 || tc === 41
                        ? 'player_a_cards'
                        : 'player_b_cards';

                let indexObj = { 21: 0, 26: 1, 31: 2, 36: 3, 41: 4, 46: 5 };
                let i = indexObj[tc];

                if (this.Game[propName].length !== 3) {
                    await this.Game.update({
                        game_status: `card_drawn_${i + 1}`,
                        [propName]: [
                            ...this.Game[propName],
                            `${this.cards.deck[i].number}${this.cards.deck[i].type}`,
                        ],
                    });
                    this.logger.debug(`Draw-${i + 1}`);
                }
            }

            // Updating Game Status to "Results Declared"
            else if (this.Timer === 51) {
                // Calling Cards Compare Function
                const winnerData = this.compareCards(
                    this.Game.player_a_cards,
                    this.Game.player_b_cards,
                );
                await this.Game.update({
                    game_status: 'result_declared',
                    ...winnerData,
                    result_timestamp: Date.now(),
                });
                this.checkBets(this.Game);

                this.logger.debug('Declare Results');
            }

            // Updating Game Status to "Completed" and Clearing the Interval
            else if (this.Timer >= 59) {
                await this.Game.update({
                    game_status: 'completed',
                });
                this.logger.debug('Game Completed');

                // Renew the Variables
                this.Game = null;
                this.Timer = 0;
                this.cards = new Card(true);
            }
        } catch (err) {
            this.logger.error('--------------------------------');
            this.logger.error('Error in Game Cron: ' + err.message);
            this.logger.error(err);
            this.logger.error('--------------------------------');
        }
    }

    async checkBets(Game: any) {
        // Set bet result to 'win'
        await global.DB.Bets.update(
            { bet_result: 'win' },
            {
                where: {
                    game_id: Game.id,
                    bet_option: Game.winner,
                },
            },
        );

        // Set bet result to 'lose'
        await global.DB.Bets.update(
            { bet_result: 'lose' },
            {
                where: {
                    game_id: Game.id,
                    bet_option: { [Op.ne]: Game.winner },
                },
            },
        );

        // Find All Bets placed in the Current Game
        const bets = await global.DB.Bets.findAll({
            where: {
                game_id: Game.id,
            },
        });

        // Iterating all Bets and
        // Updating Users 'wallet_balance' according to 'bet_result'
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
    // async betSimulation(Game: any, option: string) {
    //     await Promise.all([
    //         await global.DB.Bets.create({
    //             game_id: Game.id,
    //             user_id: 1,
    //             amount: 100,
    //             bet_option: option,
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
        // Generating Score for Players Cards using 'TeenPattiSolver Package'
        let playerA = teenPattiScore.scoreHandsNormal(player_a_cards);
        let playerB = teenPattiScore.scoreHandsNormal(player_b_cards);

        if (playerA.score > playerB.score)
            return { winner: 'A', win_desc: playerA.desc };
        else if (playerA.score < playerB.score)
            return { winner: 'B', win_desc: playerB.desc };
        else return { winner: 'Draw' };
    }
}
