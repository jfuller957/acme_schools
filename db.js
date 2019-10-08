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
        unique: true,
        allowNull: false
    },
    gpa: {
        type: Sequelize.DECIMAL,
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

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
        const [ucsdSchool, csusmSchool, calpolySchool, palomarSchool] = await
            Promise.all([
                School.create({ name: 'UCSD'}),
                School.create({ name: 'CSUSM'}),
                School.create({ name: 'Cal-Poly'}),
                School.create({ name: 'Palomar'})
            ]);

    
    const schools = await School.findAll();
        const [moeStudent, larryStudent, curlyStudent, shepStudent] = await
        Promise.all([
            Student.create({ firstName: 'Moe', lastName: 'Alpha', email: 'moe.alpha@grumble.com', gpa: '4.0', schoolId: calpolySchool.id }),
            Student.create({ firstName: 'Larry', lastName: 'Bravo', email: 'larry.bravo@bumble.com', gpa: '2.0', schoolId: calpolySchool.id }),
            Student.create({ firstName: 'Curly', lastName: 'Charlie', email: 'curly.charlie@tumble.com', gpa: '2.0', schoolId: ucsdSchool.id }),
            Student.create({ firstName: 'Shep', lastName: 'Delta', email: 'shep.delta@mumble.com', gpa: '3.0' })
        ]);

    const students = await Student.findAll();
};

module.exports = {
    syncAndSeed,
    models: {
        School,
        Student
    }
};