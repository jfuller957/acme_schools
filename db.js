const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/students_and_schools_db');

const Student = conn.define('student', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name: {

        type: Sequelize.STRING,
        allowNull: false
    }
});

const School = conn.define('school', {});


const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    const [moeStudent, larryStudent, curlyStudent, shepStudent] = await      Promise.all([
            Student.create({ name: 'moe'}),
            Student.create({ name: 'larry'}),
            Student.create({ name: 'curly'}),
            Student.create({ name: 'shep'})
        ]);

    const students = await Student.findAll();

    const [ucSchool, csuSchool, privateSchool, juniorSchool] = await
        Promise.all([
            School.create({ name: 'uc'}),
            School.create({ name: 'csu'}),
            School.create({ name: 'private'}),
            School.create({ name: 'junior'})
        ]);

    const schools = await School.findAll();
};

syncAndSeed();

module.exports = {
    syncAndSeed,
    models: {
        School,
        Student
    }
}