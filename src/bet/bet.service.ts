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
            attributes: ['id', 'name', 'wallet_balance', 'exposure_balance'],
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

    // Version 1.0 Basic
    async betReport(req: Request, body: any) {
        let { limit, page } = body;
        limit = limit || 100;
        page = page || 1;

        let filter = {
            user_id: req['user'].id,
        };

        const totalItems = await global.DB.Bets.count({ where: filter });
        const offset = limit * (page - 1);
        const totalPages = Math.ceil(totalItems / limit);

        const userBets = await global.DB.Bets.findAll({
            where: filter,
            attributes: [
                'id',
                'game_id',
                'user_id',
                'amount',
                'bet_result',
                'bet_odds',
                'bet_option',
            ],
            limit,
            offset,
        });

        return {
            message: 'Bets data fetched successfully',
            data: userBets,
            limit,
            page,
            totalItems,
            totalPages,
        };
    }
}
