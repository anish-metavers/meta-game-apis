import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
} from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class RoleGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        const user = await global.DB.UserRoles.findOne({
            where: {
                user_id: req.user.id,
                role_id: 1,
            },
        });
        if (!user)
            throw new HttpException(
                'Only Admin has access to this Page!!',
                401,
            );

        return true;
    }
}
