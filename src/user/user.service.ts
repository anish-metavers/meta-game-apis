import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async getUser() {
        const user = await global.DB.User.findAll({
            attributes: ['id', 'name', 'email'],
        });
        return user;
    }
}
