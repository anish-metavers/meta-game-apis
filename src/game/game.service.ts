import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
// import { CreateGameDto } from './dto/create-game.dto';
// import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
    async findLiveGame() {
        const liveGame = await global.DB.Game.findOne({
            where: {
                game_status: { [Op.ne]: 'completed' },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            order: [['createdAt', 'DESC']],
        });
        return {
            message: 'Game Data Fetched Successfully',
            gameData: liveGame,
        };
    }

    async lastTenGames() {
        const gameResults = await global.DB.Game.findAll({
            where: {
                game_status: 'completed',
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
