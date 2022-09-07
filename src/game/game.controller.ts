import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseFilters,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from 'guards/auth.guard';
import { GlobalExceptionsFilter } from 'exception/GlobalException.filter';
import { HttpExceptionFilter } from 'exception/HttpException.filter';

@Controller('game')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionsFilter, HttpExceptionFilter)
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get('live-game')
    findLiveGame() {
        return this.gameService.findLiveGame();
    }

    @Get('last-10-games')
    lastTenGames() {
        return this.gameService.lastTenGames();
    }
}
