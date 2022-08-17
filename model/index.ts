import { Sequelize, DataTypes } from 'sequelize';
import User from './user';

const DB = async () => {
  const sequelize = new Sequelize('TestDB', 'root', 'MetaTech', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully (MySql).');

    const db = {
      sequelize: sequelize,
      User: User(sequelize, DataTypes),
    };
    // await sequelize.sync({ force: true });

    global.DB = db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default DB;
