import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
// import { CreateGameDto } from './dto/create-game.dto';
// import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
    async findLiveGame() {
        // const liveGame = await global.DB.Game.findOne({
        //     where: {
        //         game_status: { [Op.ne]: 'result_declared' },
        //     },
        //     attributes: {
        //         exclude: ['createdAt', 'updatedAt'],
        //     },
        //     order: [['createdAt', 'DESC']],
        // });
        return {
            message: 'Game Data Fetched Successfully',
            gameData: {
                id: 1,
                title: 'Regular Teen Patti',
                winner: null,
                player_a_cards: ['S-2', 'H-K', 'H-6'],
                player_b_cards: ['C-4', 'C-A', 'D-Q'],
                result_timestamp: null,
                current_time: 51,
                game_status: 'processing_result',
            },
        };
    }

    async lastTenGames() {
        const gameResults = await global.DB.Game.findAll({
            where: {
                game_status: 'result_declared',
            },
            attributes: [
                'id',
                'winner',
                'player_a_cards',
                'player_b_cards',
                'result_timestamp',
                'game_status',
            ],
            order: [['result_timestamp', 'DESC']],
            limit: 10,
        });
        return {
            message: 'Last 10 Game Data Fetched Successfully',
            gameData: gameResults,
        };
    }
}
