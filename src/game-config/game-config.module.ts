import { Module } from '@nestjs/common';
import { GameConfigService } from './game-config.service';
import { GameConfigController } from './game-config.controller';

@Module({
  controllers: [GameConfigController],
  providers: [GameConfigService]
})
export class GameConfigModule {}
