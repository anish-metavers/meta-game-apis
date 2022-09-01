import { Controller, Post, Body, HttpCode, UseFilters } from '@nestjs/common';
import { LoginDTO, SignUpDTO } from './dto/authDTO';
import { AuthService } from './auth.service';
import { GlobalExceptionsFilter } from 'exception/GlobalException.filter';
import { HttpExceptionFilter } from 'exception/HttpException.filter';

@Controller('auth')
@UseFilters(GlobalExceptionsFilter, HttpExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Login Controller
    @Post('login')
    @HttpCode(200)
    async loginUser(@Body() body: LoginDTO) {
        return await this.authService.loginUser(body);
    }

    @Post('signup')
    @HttpCode(200)
    async signUpUser(@Body() body: SignUpDTO) {
        return await this.authService.signUpUser(body);
    }
}
