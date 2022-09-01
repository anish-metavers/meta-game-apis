import { HttpException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
    async create(createPermissionDto: CreatePermissionDto) {
        const { name } = createPermissionDto;

        const permission = await global.DB.Permissions.findOne({
            where: { name },
        });
        if (permission)
            throw new HttpException(
                'Permission Already Exist with this name!!',
                400,
            );

        const newPermission = await global.DB.Permissions.create({ name });

        return {
            message: 'New Permission created successfully!!',
            permission: newPermission,
        };
    }

    async findAll() {
        const permissions = await global.DB.Permissions.findAll();
        return {
            message: 'Permission data fetched Successfully!!',
            permissions,
        };
    }

    async findOne(id: number) {
        const permission = await global.DB.Permissions.findOne({
            where: { id },
        });
        return {
            message: 'Permission data fetched Successfully!!',
            permission,
        };
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        const { name } = updatePermissionDto;
        const permission = await global.DB.Permissions.findOne({
            where: { id },
        });
        if (!permission)
            throw new HttpException('Permission not found with this Id!!', 400);

        await permission.update({ name });
        return { message: 'Permission Updated Successfully!!', permission };
    }

    async remove(id: number) {
        const permission = await global.DB.Permissions.destroy({
            where: { id },
        });
        return { message: 'Permission deleted Successfully!!', permission };
    }
}
