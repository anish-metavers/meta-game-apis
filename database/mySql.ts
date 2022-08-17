import { Sequelize } from 'sequelize';

const DB = async () => {
  const sequelize: Sequelize = new Sequelize('TestDB', 'root', 'MetaTech', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully (MySql).');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelize;
};

export default DB;
