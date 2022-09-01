import { Model } from 'sequelize';

class RolesPermissions extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    RolesPermissions.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            permission_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: { type: DataTypes.DATE, field: 'created_at' },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'RolesPermissions',
            tableName: 'roles_permissions',
        },
    );
    return RolesPermissions;
};

export default model;
