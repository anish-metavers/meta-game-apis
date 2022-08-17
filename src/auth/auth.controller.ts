import { Controller, Post, Req, Res, Body, HttpCode } from '@nestjs/common';
import { LoginDTO, SignUpDTO } from './dto/authDTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Login Controller
    @Post('login')
    @HttpCode(200)
    async loginUser(@Body() body: LoginDTO) {
        const user = await this.authService.loginUser(body);
        const token = this.authService.createJWT(user.id, user.email);
        return { message: 'Login Successfully', token, data: user };
    }

    @Post('signup')
    @HttpCode(200)
    async signUpUser(@Body() body: SignUpDTO) {
        const user = await this.authService.signUpUser(body);
        const token = this.authService.createJWT(user.id, user.email);
        return { message: 'SignUp Successfully', token, data: user };
    }
}
