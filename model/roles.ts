import { Model } from 'sequelize';

class Roles extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    Roles.init(
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
            createdAt: { type: DataTypes.DATE, field: 'created_at' },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Roles',
            tableName: 'roles',
        },
    );
    return Roles;
};

export default model;
