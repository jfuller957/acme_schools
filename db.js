const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost/students_and_schools_db');

const Student = conn.define('student', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
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
        allowNull: false
    }
});

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    try {
        const [moeStudent, larryStudent, curlyStudent, shepStudent] = await
        Promise.all([
            Student.create({ firstName: 'moe', lastName: 'alpha', email: 'moe.alpha@grumble.com'}),
            Student.create({ firstName: 'larry', lastName: 'bravo', email: 'larry.bravo@bumble.com'}),
            Student.create({ firstName: 'curly', lastName: 'charlie', email: 'curly.charlie@tumble.com'}),
            Student.create({ firstName: 'shep', lastName: 'delta', email: 'shep.delta@mumble.com'})
        ]);
        console.log('success');
    }
    catch (err) {
        console.log(err);
    }

    const students = await Student.findAll();

    try {
        const [ucsdSchool, csusmSchool, calpolySchool, palomarSchool] = await
            Promise.all([
                School.create({ name: 'UCSD'}),
                School.create({ name: 'CSUSM'}),
                School.create({ name: 'Cal-Poly'}),
                School.create({ name: 'Palomar'})
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