import { Injectable, Body, HttpException } from '@nestjs/common';
import { LoginDTO, SignUpDTO, passwordSchema } from './dto/authDTO';
import { Op } from 'sequelize';
const jwt = require('jsonwebtoken');
// import * as  jwt  from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

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

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new HttpException('Incorrect Password!!', 400);

        const userPass = await global.DB.User.findOne({
            where: {
                email: email.toLowerCase(),
            },
            attributes: ['id', 'name', 'email'],
        });

        return userPass;
    }

    async signUpUser(@Body() body: SignUpDTO) {
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
}
