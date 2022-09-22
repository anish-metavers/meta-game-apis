import { Model } from 'sequelize';

class Upi extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    Upi.init(
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            vpa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            upi_type: {
                type: DataTypes.ENUM('Google Pay', 'Paytm', 'Bhim Upi'),
                allowNull: false,
            },
            priority: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('1', '0'),
                allowNull: false,
                defaultValue: '1',
            },
            createdAt: { type: DataTypes.DATE, field: 'created_at' },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Upi',
            tableName: 'upi_details',
        },
    );
    return Upi;
};

export default model;
