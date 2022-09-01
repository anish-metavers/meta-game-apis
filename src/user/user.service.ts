import { Body, Injectable, HttpException } from '@nestjs/common';
import { CreateUser, UpdateUser, passwordSchema } from './dto/userDTO';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    async getUser() {
        const user = await global.DB.User.findAll({
            attributes: ['id', 'name', 'email'],
        });
        return user;
    }

    async createUser(@Body() body: CreateUser) {
        const { name, password, roles } = body;
        const email = body.email.toLowerCase();

        const isPassValid = passwordSchema.validate(password, {
            details: true,
        });

        if (isPassValid && isPassValid.length > 0)
            throw new HttpException(isPassValid[0].message, 400);

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
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await global.DB.User.create({
            name,
            email,
            password: passwordHash,
        });

        // Assigning Roles!!

        if (!roles || roles.length === 0)
            return { id: newUser.id, name: newUser.name, email: newUser.email };

        const rolesFound = await global.DB.Roles.findAll({
            where: { id: { [Op.in]: roles } },
            attributes: ['id'],
        });

        if (rolesFound && rolesFound.length > 0) {
            const userRolesObj = rolesFound.map((item: any) => {
                return { user_id: newUser.id, role_id: item.id };
            });
            await global.DB.UserRoles.bulkCreate(userRolesObj);
        }

        return { id: newUser.id, name: newUser.name, email: newUser.email };
    }

    async updateUser(id: number, @Body() body: UpdateUser) {
        const { name, password, roles } = body;
        const email = body.email.toLowerCase();

        const isPassValid = passwordSchema.validate(password, {
            details: true,
        });
        if (isPassValid && isPassValid.length > 0)
            throw new HttpException(isPassValid[0].message, 400);

        const user = await global.DB.User.findOne({
            where: {
                id,
            },
            attributes: ['id', 'email', 'name'],
        });

        if (!user)
            throw new HttpException('No User Found with the given Id!!', 400);

        if (user.email !== email) {
            const isEmailValid = await global.DB.User.findOne({
                where: { email },
                attributes: ['id'],
            });
            if (isEmailValid)
                throw new HttpException('Email Already in Use!!', 400);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await user.update({
            name,
            email,
            password: passwordHash,
        });

        // Assigning Roles!!

        // Deleting previous Roles
        await global.DB.UserRoles.destroy({
            where: { user_id: id },
        });

        if (!roles || roles.length === 0)
            return { id: user.id, name: user.name, email: user.email };

        const rolesFound = await global.DB.Roles.findAll({
            where: { id: { [Op.in]: roles } },
            attributes: ['id'],
        });

        if (rolesFound && rolesFound.length > 0) {
            const userRolesObj = rolesFound.map((item: any) => {
                return { user_id: user.id, role_id: item.id };
            });
            await global.DB.UserRoles.bulkCreate(userRolesObj);
        }

        return { id: user.id, name: user.name, email: user.email };
    }

    async deleteUser(id: number) {
        const user = await global.DB.User.findOne({
            where: {
                id,
            },
            attributes: ['id'],
        });

        if (!user)
            throw new HttpException('No User Found with the given Id!!', 400);

        await user.destroy();

        await global.DB.UserRoles.destroy({
            where: { user_id: id },
        });
    }
}
