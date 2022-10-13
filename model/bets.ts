import { Model } from 'sequelize';

class Bets extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    Bets.init(
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            game_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT(10, 2),
                allowNull: false,
            },
            bet_option: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bet_odds: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            bet_result: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null,
            },
            createdAt: { type: DataTypes.DATE, field: 'created_at' },
            updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Bets',
            tableName: 'bets',
        },
    );
    return Bets;
};

export default model;
