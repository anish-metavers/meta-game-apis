import { HttpException, Injectable } from '@nestjs/common';
import { CreateBet } from './dto/createBet.dto';
import { Request } from 'express';
import { literal } from 'sequelize';
import { ErrorConfig } from 'utils/config';

@Injectable()
export class BetService {
    async betResults(game_id: number, req: Request) {
        const userBets = await global.DB.Bets.findAll({
            where: {
                user_id: req['user'].id,
                game_id: game_id,
            },
            attributes: [
                'id',
                'game_id',
                'user_id',
                'amount',
                'bet_result',
                'bet_odds',
            ],
        });

        return {
            message: 'Bet Results fetched successfully',
            data: userBets,
        };
    }
    async createBet(req: Request, body: CreateBet) {
        const { game_id, amount, option } = body;

        if (amount <= 0)
            throw new HttpException(
                {
                    ...ErrorConfig.BET_GREATER_THAN_ZERO,
                    statusCode: 400,
                },
                400,
            );

        // Check if Game Exist
        const isGame = await global.DB.Game.findOne({
            where: { id: game_id, game_status: 'betting' },
        });
        if (!isGame)
            throw new HttpException(
                {
                    ...ErrorConfig.GAME_NOT_FOUND_OR_BETTING_CLOSED,
                    statusCode: 400,
                },
                400,
            );

        const checkUserBalance = await global.DB.User.findOne({
            where: { id: req['user'].id },
            attributes: ['id', 'name', 'wallet_balance'],
        });
        if (
            checkUserBalance.wallet_balance -
                checkUserBalance.exposure_balance <
            amount
        )
            throw new HttpException(
                {
                    ...ErrorConfig.NOT_ENOUGH_BALANCE,
                    statusCode: 400,
                },
                400,
            );

        const [bet] = await Promise.all([
            await global.DB.Bets.create({
                game_id,
                user_id: req['user'].id,
                amount,
                bet_option: option,
                bet_odds: 1.97,
            }),
            await checkUserBalance.update({
                exposure_balance: literal(`exposure_balance + ${amount}`),
            }),
        ]);

        return {
            message: 'Bet Placed Successfully',
            data: bet,
        };
    }
}
