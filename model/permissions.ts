import { Model, literal } from 'sequelize';

class Permissions extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    Permissions.init(
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: literal('CURRENT_TIMESTAMP'),
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: literal('CURRENT_TIMESTAMP'),
                field: 'updated_at',
            },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Permissions',
            tableName: 'permissions',
        },
    );
    return Permissions;
};

export default model;
