import { HttpException, Injectable } from '@nestjs/common';
import { CreateBet } from './dto/createBet.dto';
import { Request } from 'express';
import { literal } from 'sequelize';

@Injectable()
export class BetService {
    async createBet(req: Request, body: CreateBet) {
        const { game_id, amount, option } = body;

        if (amount <= 0)
            throw new HttpException(
                {
                    errorCode: 'E-0020',
                    message: 'Bet Amount must be greater than Zero.',
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
                    errorCode: 'E-0021',
                    message: 'No Game Found Or Betting Closed.',
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
                    errorCode: 'E-0022',
                    message: 'Not Enough Balance',
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
