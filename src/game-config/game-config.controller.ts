import { Controller, Get, HttpCode } from '@nestjs/common';
import { GameConfigService } from './game-config.service';

@Controller('game-config')
export class GameConfigController {
    constructor(private readonly gameConfigService: GameConfigService) {}

    @Get()
    @HttpCode(200)
    getGameConfig() {
      return this.gameConfigService.getGameConfig();
    }
}
