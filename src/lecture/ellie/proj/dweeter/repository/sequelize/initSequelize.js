import sq from 'sequelize';
import config from '../../configure/config.js';

const {host, port, user: username, pass: password, database} = config.db;
const sequelize = new sq.Sequelize({
    host,
    port,
    username,
    password,
    database,
    dialect: "mysql",
    logging: false,
});

export default sequelize;
