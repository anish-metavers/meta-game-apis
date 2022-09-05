import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
// import { CreateGameDto } from './dto/create-game.dto';
// import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
    async findLiveGame() {
        const liveGame = await global.DB.Game.findOne({
            where: {
                // game_status: { [Op.ne]: 'result_declared' },
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
}
