import { Model } from 'sequelize';

class User extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    User.init(
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            wallent_balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: { type: DataTypes.DATE, field: 'created_at' },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'User',
            tableName: 'users',
        },
    );
    return User;
};

export default model;
