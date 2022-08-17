import {
    Controller,
    Get,
    Post,
    HttpCode,
    Req,
    UseGuards,
    Body,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { RoleGuard } from 'guards/role.guard';
import { SignUpDTO } from 'src/auth/dto/authDTO';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(202)
    async getUser(@Req() req: Request) {
        return {
            user: req['user'],
            data: await this.userService.getUser(),
        };
    }

    @Post()
    @HttpCode(202)
    @UseGuards(RoleGuard)
    async createUser(@Req() req: Request, @Body() body: SignUpDTO) {
        const createdUser = await this.userService.createUser(body);
        return {
            currentUser: req['user'],
            createdUser,
        };
    }
}
