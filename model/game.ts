import { Model } from 'sequelize';

class Game extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    Game.init(
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            player_a_cards: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            player_b_cards: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            current_time: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            winner: {
                type: DataTypes.ENUM('A', 'B', 'Draw'),
                allowNull: true,
            },
            win_desc: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            result_timestamp: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            game_status: {
                type: DataTypes.ENUM(
                    'betting',
                    'card_drawn_1',
                    'card_drawn_2',
                    'card_drawn_3',
                    'card_drawn_4',
                    'card_drawn_5',
                    'card_drawn_6',
                    'processing_result',
                    'result_declared',
                    'completed',
                ),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
            },
        },
        {
            timestamps: true,
            sequelize,
            modelName: 'Game',
            tableName: 'game',
        },
    );
    return Game;
};

export default model;
