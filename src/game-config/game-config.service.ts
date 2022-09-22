import { Injectable } from '@nestjs/common';

@Injectable()
export class GameConfigService {
    async getGameConfig() {
        // const {} = body;

        const gameConfig = await global.DB.GameConfig.findOne({});

        return {
            message: 'Game Config fetched successfully',
            data: gameConfig,
        };
    }
}
