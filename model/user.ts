import { Model } from 'sequelize';

class User extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    User.init(
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
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
            mobile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            alt_email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            alt_mobile: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            alt_mobile_country_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            wallet_balance: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0,
            },
            exposure_balance: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0,
            },
            credentials_expired: {
                type: DataTypes.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '1',
            },
            deposit_exposure: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                defaultValue: 0,
            },
            hide_account: {
                type: DataTypes.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '1',
            },
            mac_address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            remark: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            verified: {
                type: DataTypes.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '0',
            },
            created_by_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            account_locked: {
                type: DataTypes.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '1',
            },
            account_expired: {
                type: DataTypes.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '1',
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
            modelName: 'User',
            tableName: 'users',
        },
    );
    return User;
};

export default model;
