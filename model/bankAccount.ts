import { Model } from 'sequelize';
import * as moment from 'moment';
class BankAccount extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    BankAccount.init(
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
            bank_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            account_no: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ifsc_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            account_type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            priority: {
                type: DataTypes.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '0',
            },
            status: {
                type: DataTypes.ENUM('1', '0'),
                allowNull: false,
                defaultValue: '1',
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
                get() {
                    return moment(this.getDataValue('createdAt')).format(
                        'YYYY-MM-DD HH:mm:ss',
                    );
                },
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
                get() {
                    return moment(this.getDataValue('createdAt')).format(
                        'YYYY-MM-DD HH:mm:ss',
                    );
                },
            },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'BankAccount',
            tableName: 'bank_accounts',
        },
    );
    return BankAccount;
};

export default model;
