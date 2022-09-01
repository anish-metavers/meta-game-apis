import {
    Controller,
    Get,
    Post,
    HttpCode,
    Req,
    UseGuards,
    Body,
    Patch,
    Delete,
    UseFilters,
    Param,
} from '@nestjs/common';
import { GlobalExceptionsFilter } from 'exception/GlobalException.filter';
import { HttpExceptionFilter } from 'exception/HttpException.filter';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { PermissionGuard } from 'guards/role.guard';
import { CreateUser, UpdateUser } from './dto/userDTO';
import { UserService } from './user.service';
import { Config } from 'utils/config';

@Controller('user')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionsFilter, HttpExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(202)
    @UseGuards(new PermissionGuard(Config.READ_ACCESS))
    async getUser(@Req() req: Request) {
        return {
            user: req['user'],
            data: await this.userService.getUser(),
        };
    }

    @Post()
    @HttpCode(202)
    @UseGuards(new PermissionGuard(Config.CREATE_ACCESS))
    async createUser(@Req() req: Request, @Body() body: CreateUser) {
        const createdUser = await this.userService.createUser(body);
        return {
            currentUser: req['user'],
            createdUser,
        };
    }

    @Patch(':id')
    @HttpCode(202)
    @UseGuards(new PermissionGuard(Config.UPDATE_ACCESS))
    async updateUser(
        @Param('id') id: string,
        @Req() req: Request,
        @Body() body: UpdateUser,
    ) {
        const createdUser = await this.userService.updateUser(+id, body);
        return {
            currentUser: req['user'],
            createdUser,
        };
    }

    @Delete(':id')
    @HttpCode(202)
    @UseGuards(new PermissionGuard(Config.DELETE_ACCESS))
    async deleteUser(@Param('id') id: string, @Req() req: Request) {
        const createdUser = await this.userService.deleteUser(+id);
        return {
            currentUser: req['user'],
            createdUser,
        };
    }
}
