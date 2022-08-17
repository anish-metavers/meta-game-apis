import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        let token = null;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            throw new HttpException(
                {
                    status: 'fail',
                    code: 401,
                    message: 'Unauthenticated, no token found',
                },
                401,
            );
        }

        try {
            const decoded = jwt.verify(token, 'secret');
            const { id } = decoded;

            const user = await global.DB.User.findOne({
                where: { id },
                attributes: ['id', 'name', 'email'],
            });

            if (!user) throw new HttpException('No User Found!!', 401);

            req.headers.user = user;
            next();
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: 401,
                    message: 'Invalid Token Provided!!',
                    error,
                },
                401,
            );
        }
    }
}
