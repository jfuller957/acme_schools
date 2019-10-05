const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/students_and_schools_db');

const Student = conn.define('student', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

const School = conn.define('school', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    try {
        const [moeStudent, larryStudent, curlyStudent, shepStudent] = await
        Promise.all([
            Student.create({ name: 'moe'}),
            Student.create({ name: 'larry'}),
            Student.create({ name: 'curly'}),
            Student.create({ name: 'shep'})
        ]);
        console.log('success');
    }
    catch (err) {
        console.log(err);
    }

    const students = await Student.findAll();

    try {
        const [ucSchool, csuSchool, privateSchool, juniorSchool] = await
            Promise.all([
                School.create({ name: 'uc'}),
                School.create({ name: 'csu'}),
                School.create({ name: 'private'}),
                School.create({ name: 'junior'})
            ]);

        const schools = await School.findAll();
        console.log('success');
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = {
    syncAndSeed,
    models: {
        School,
        Student
    }
};