import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    async create(createRoleDto: CreateRoleDto) {
        const { name, priority } = createRoleDto;

        const role = await global.DB.Roles.findOne({ where: { name } });
        if (role)
            throw new HttpException('Role Already Exist with this name!!', 400);

        const newRole = await global.DB.Roles.create({ name, priority });

        return { message: 'New Role created successfully!!', role: newRole };
    }

    async findAll() {
        const roles = await global.DB.Roles.findAll();
        return { message: 'Roles data fetched Successfully!!', roles };
    }

    async findOne(id: number) {
        const role = await global.DB.Roles.findOne({ where: { id } });
        return { message: 'Role data fetched Successfully!!', role };
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        const { name, priority } = updateRoleDto;
        const role = await global.DB.Roles.findOne({ where: { id } });
        if (!role)
            throw new HttpException('Role not found with this Id!!', 400);

        await role.update({ name, priority });
        return { message: 'Role Updated Successfully!!', role };
    }

    async remove(id: number) {
        const role = await global.DB.Roles.destroy({ where: { id } });
        return { message: 'Role deleted Successfully!!', role };
    }
}
