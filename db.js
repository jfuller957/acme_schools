const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/students_and_schools_db');

const Student = conn.define('student', {});

const School = conn.define('school', {});


conn.sync({ force: true });

// const syncAndSeed = async()=> {
//     await conn.sync({ force: true });
// };

// module.exports = {
//     syncAndSeed
// }