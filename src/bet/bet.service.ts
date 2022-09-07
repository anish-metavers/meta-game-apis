import { HttpException, Injectable } from '@nestjs/common';
import { CreateBet } from './dto/createBet.dto';
import { Request } from 'express';

@Injectable()
export class BetService {
    async createBet(req: Request, body: CreateBet) {
        const { game_id, amount, option, time } = body;

        if (typeof amount !== 'number' && amount <= 0)
            throw new HttpException('Amount must be greater than Zero.', 400);

        // Check if Game Exist
        const isGame = await global.DB.Game.findOne({ where: { id: game_id } });
        if (!isGame)
            throw new HttpException('No Game Found with Given Id', 400);

        const checkUserBalance = await global.DB.User.findOne({
            where: { id: req['user'].id },
            attributes: ['id', 'name', 'wallet_balance'],
        }); 
        if (checkUserBalance.wallet_balance < amount)
            throw new HttpException('Not Enough Balance', 400);

        const bet = await global.DB.Bets.create({
            game_id,
            user_id: req['user'].id,
            amount,
            bet_option: option,
        });

        return {
            message: 'Bet Placed Successfully',
            data: bet,
        };
    }
}
