import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
} from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
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
                attributes: [
                    'id',
                    'name',
                    'email',
                    'wallet_balance',
                    'exposure_balance',
                ],
            });

            if (!user) throw new HttpException('No User Found!!', 401);

            req.user = user;
            return true;
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
