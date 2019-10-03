const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/archers_testing_db');

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
};

module.exports = {
    syncAndSeed
}