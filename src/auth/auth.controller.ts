import {
    Controller,
    Post,
    Body,
    HttpCode,
    UseFilters,
    Req,
} from '@nestjs/common';
import { LoginDTO, SignUpDTO } from './dto/authDTO';
import { AuthService } from './auth.service';
import { GlobalExceptionsFilter } from 'exception/GlobalException.filter';
import { HttpExceptionFilter } from 'exception/HttpException.filter';
import { Request } from 'express';

@Controller('auth')
@UseFilters(GlobalExceptionsFilter, HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Login Controller
    @Post('login')
    @HttpCode(200)
    async loginUser(@Body() body: LoginDTO, @Req() req: Request) {
        return await this.authService.loginUser(body, req);
    }

    @Post('signup')
    @HttpCode(200)
    async signUpUser(@Body() body: SignUpDTO, @Req() req: Request) {
        return await this.authService.signUpUser(body, req);
    }
}
