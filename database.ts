
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database:'DataBasePFE',
  username:   'root',
  password: '',
  dialect: 'mysql',
  port: 3306,
  models: [__dirname + "/src/models"],
  logging:false,
  pool: {
    max: 5, // maximum number of connections in the pool
    min: 0, // minimum number of connections in the pool
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
  }
});

export default sequelize;