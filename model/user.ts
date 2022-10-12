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
                // NEW
                type: DataTypes.STRING,
                allowNull: true,
            },
            country_code: {
                // NEW
                type: DataTypes.STRING,
                allowNull: true,
            },
            alt_email: {
                // NEW
                type: DataTypes.STRING,
                allowNull: true,
            },
            alt_mobile: {
                // NEW
                type: DataTypes.STRING,
                allowNull: true,
            },
            alt_mobile_country_code: {
                // NEW
                type: DataTypes.STRING,
                allowNull: true,
            },
            wallet_balance: {
                type: DataTypes.FLOAT(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
            exposure_balance: {
                type: DataTypes.FLOAT(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
            deposit_exposure: {
                // NEW
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 0,
            },
            mac_address: {
                // NEW
                type: DataTypes.STRING,
                allowNull: true,
            },
            remark: {
                // NEW
                type: DataTypes.STRING,
                allowNull: true,
            },
            role_id: {
                // NEW
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            created_by_id: {
                // NEW
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('1', '0'),
                allowNull: false,
                defaultValue: '1',
            },
            // credentials_expired_status: { // NEW
            //     type: DataTypes.ENUM('0', '1'),
            //     allowNull: false,
            //     defaultValue: '1',
            // },
            // hide_account: { // NEW
            //     type: DataTypes.ENUM('0', '1'),
            //     allowNull: false,
            //     defaultValue: '1',
            // },
            // verified: { // NEW
            //     type: DataTypes.ENUM('0', '1'),
            //     allowNull: false,
            //     defaultValue: '0',
            // },
            // account_locked: { // NEW
            //     type: DataTypes.ENUM('0', '1'),
            //     allowNull: false,
            //     defaultValue: '1',
            // },
            // account_expired: { // NEW
            //     type: DataTypes.ENUM('0', '1'),
            //     allowNull: false,
            //     defaultValue: '1',
            // },
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
