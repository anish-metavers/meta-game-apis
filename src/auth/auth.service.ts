import { Injectable, Body, HttpException } from '@nestjs/common';
import { LoginDTO, SignUpDTO } from './dto/authDTO';
const jwt = require('jsonwebtoken');
// import { jwt } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    createJWT(id: Number, email: String): String {
        return jwt.sign({ id, email }, 'secret', { expiresIn: '2h' });
    }

    async loginUser(@Body() body: LoginDTO) {
        const { email, password } = body;

        if (!email || !password)
            throw new HttpException('All Fields are Required!!', 400);

        const user = await global.DB.User.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (!user)
            throw new HttpException('No User found with this Email!!', 400);

        const userPass = await global.DB.User.findOne({
            where: {
                email: email.toLowerCase(),
                password: password,
            },
            attributes: ['id', 'name', 'email'],
        });

        if (!userPass) throw new HttpException('Incorrect Password!!', 400);

        return userPass;
    }

    async signUpUser(@Body() body: SignUpDTO) {
        const { name, password } = body;
        const email = body.email.toLowerCase();

        if (!name || !email || !password)
            throw new HttpException('All Fields are Required!!', 400);

        const user = await global.DB.User.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'email'],
        });

        if (user)
            throw new HttpException(
                'User Already Exist with this Email!!',
                400,
            );

        const newUser = await global.DB.User.create({
            name,
            email,
            password,
        });

        return { id: newUser.id, name: newUser.name, email: newUser.email };
    }
}
