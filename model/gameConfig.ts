import { Model } from 'sequelize';

class GameConfig extends Model {}

const model = (sequelize: any, DataTypes: any) => {
    GameConfig.init(
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            game_type_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            rules: {
                type: DataTypes.STRING(1500),
                allowNull: false,
            },
            game_timer: {
                type: DataTypes.INTEGER,
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
            modelName: 'GameConfig',
            tableName: 'game_config',
        },
    );
    return GameConfig;
};

export default model;
