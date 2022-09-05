import { Sequelize, DataTypes } from 'sequelize';
import User from './user';
import Roles from './roles';
import UserRoles from './userRoles';
import Permissions from './permissions';
import RolesPermissions from './rolesPermissions';
import Game from './game';

const DB = async () => {
    const sequelize = new Sequelize(
        process.env.IS_PROD === 'true'
            ? process.env.PROD_MYSQL_DB
            : process.env.LOCAL_MYSQL_DB,
        process.env.IS_PROD === 'true'
            ? process.env.PROD_MYSQL_USER
            : process.env.LOCAL_MYSQL_USER,
        process.env.IS_PROD === 'true'
            ? process.env.PROD_MYSQL_PASSWORD
            : process.env.LOCAL_MYSQL_PASSWORD,

        {
            host:
                process.env.IS_PROD === 'true'
                    ? process.env.PROD_MYSQL_HOST
                    : process.env.LOCAL_MYSQL_HOST,
            dialect: 'mysql',
            logging: false,
            dialectOptions: {
                dateStrings: true,
                typeCast: true,
            },
            timezone: '+05:30',
        },
    );

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully (MySql).');

        const db = {
            sequelize: sequelize,
            User: User(sequelize, DataTypes),
            Roles: Roles(sequelize, DataTypes),
            UserRoles: UserRoles(sequelize, DataTypes),
            Permissions: Permissions(sequelize, DataTypes),
            RolesPermissions: RolesPermissions(sequelize, DataTypes),
            Game: Game(sequelize, DataTypes),
        };

        // // ------ DANGER TO UNCOMMENT ------
        // await sequelize.sync({ force: true });

        global.DB = db;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default DB;
