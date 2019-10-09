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
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
    }
});

Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
        const [ucsdSchool, csusmSchool, calpolySchool, palomarSchool] = await
            Promise.all([
                School.create({ name: 'UCSD', image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fdynamcdiversitymag.com%2Fwp-content%2Fuploads%2F2016%2F05%2Fucsd-logo-291x300.png&f=1&nofb=1" }),
                School.create({ name: 'CSUSM', image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F7%2F74%2FCSU_San_Marcos_Cougars_logo.svg%2F1200px-CSU_San_Marcos_Cougars_logo.svg.png&f=1&nofb=1" }),
                School.create({ name: 'Cal-Poly', image: "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.studyarchitecture.com%2Fwp-content%2Fuploads%2F13_CaliforniaStatePolytechnicUniversityPomona_icon_color.png&f=1&nofb=1" }),
                School.create({ name: 'Palomar', image: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww2.palomar.edu%2Fusers%2Fdhokett%2Fimages%2Fmidlevel01.gif&f=1&nofb=1" })
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