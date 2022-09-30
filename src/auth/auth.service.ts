import { Injectable, Body, HttpException } from '@nestjs/common';
import { LoginDTO, SignUpDTO, passwordSchema } from './dto/authDTO';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ErrorConfig } from 'utils/config';
import { Request } from 'express';

@Injectable()
export class AuthService {
    createJWT(id: Number, email: String): String {
        return jwt.sign({ id, email }, 'secret', {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    async loginUser(@Body() body: LoginDTO, req: Request) {
        const { email, password } = body;

        // Checking Email
        const user = await global.DB.User.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!user)
            throw new HttpException(
                {
                    ...ErrorConfig.EMAIL_NOT_FOUND,
                    statusCode: 400,
                },
                400,
            );

        // Checking Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new HttpException(
                {
                    ...ErrorConfig.INVALID_EMAIL_PASSWORD,
                    statusCode: 400,
                },
                400,
            );

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            wallet_balance: user.wallet_balance,
            exposure_balance: user.exposure_balance,
        };

        // Creating an Entry in UserLog
        await global.DB.UserLog.create({
            user_id: user.id,
            ip_address:
                req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            activity: 'login',
            status: '1',
        });

        // Generating Token
        const token = this.createJWT(userData.id, userData.email);

        return { message: 'Login Successfully', data: userData, token };
    }

    async signUpUser(@Body() body: SignUpDTO, req: Request) {
        const { name, password, roles } = body;
        const email = body.email.toLowerCase();

        const isPassValid = passwordSchema.validate(password, {
            details: true,
        });

        if (isPassValid && isPassValid.length > 0)
            throw new HttpException(
                {
                    errorCode: ErrorConfig.PASSWORD_VALIDATION_FAILED.errorCode,
                    message: isPassValid[0].message,
                    statusCode: 400,
                },
                400,
            );

        const user = await global.DB.User.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'email'],
        });

        if (user)
            throw new HttpException(
                {
                    ...ErrorConfig.USER_ALREADY_EXISTS,
                    statusCode: 400,
                },
                400,
            );
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await global.DB.User.create({
            name,
            email,
            password: passwordHash,
            wallet_balance: 10000,
            exposure_balance: 0,
        });

        // Creating an Entry in UserLog
        await global.DB.UserLog.create({
            user_id: user.id,
            ip_address:
                req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            activity: 'login',
            status: '1',
        });

        // Assigning Roles!!

        // TO BE IMPLEMENTED
        // if (!roles || roles.length === 0)
        //     return { id: newUser.id, name: newUser.name, email: newUser.email };

        // const rolesFound = await global.DB.Roles.findAll({
        //     where: { id: { [Op.in]: roles } },
        //     attributes: ['id'],
        // });

        // if (rolesFound && rolesFound.length > 0) {
        //     const userRolesObj = rolesFound.map((item: any) => {
        //         return { user_id: newUser.id, role_id: item.id };
        //     });
        //     await global.DB.UserRoles.bulkCreate(userRolesObj);
        // }

        const token = this.createJWT(newUser.id, newUser.email);

        return {
            message: 'SignUp Successfully',
            token,
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                wallet_balance: newUser.wallet_balance,
                exposure_balance: newUser.exposure_balance,
            },
        };
    }
}
