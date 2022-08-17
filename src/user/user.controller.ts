import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
// @UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(202)
    async getUser(@Req() req: Request) {
        return {
            user: req.headers.user,
            data: await this.userService.getUser(),
        };
    }
}
