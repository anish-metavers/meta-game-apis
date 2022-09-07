import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { BetService } from './bet.service';
import { CreateBet } from './dto/createBet.dto';

@Controller('bet')
@UseGuards(AuthGuard)
export class BetController {
    constructor(private readonly betService: BetService) {}

    @Post()
    createBet(@Body() body: CreateBet, @Req() req: Request) {
        return this.betService.createBet(req, body);
    }
}
