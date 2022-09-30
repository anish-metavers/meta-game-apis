import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post,
    Req,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { GlobalExceptionsFilter } from 'exception/GlobalException.filter';
import { HttpExceptionFilter } from 'exception/HttpException.filter';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { BetService } from './bet.service';
import { CreateBet } from './dto/createBet.dto';

@Controller('bet')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionsFilter, HttpExceptionFilter)
export class BetController {
    constructor(private readonly betService: BetService) {}

    @Post()
    @HttpCode(202)
    createBet(@Body() body: CreateBet, @Req() req: Request) {
        return this.betService.createBet(req, body);
    }

    @Get('/result/:game_id')
    @HttpCode(200)
    betResults(@Param('game_id') game_id: string, @Req() req: Request) {
        return this.betService.betResults(+game_id, req);
    }

    @Get('/report')
    @HttpCode(200)
    betReport(@Req() req: Request, @Body() body: any) {
        return this.betService.betReport(req, body);
    }
}
