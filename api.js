const app = require('express').Router();
const db = require('./db');


app.get('/students', async(req, res, next)=> {
    try {
        res.send( await db.models.Student.findAll());
    }
    catch(ex){
        next(ex);
    }
});

app.get('/schools', async(req, res, next)=> {
    try {
        res.send( await db.models.School.findAll());
    }
    catch(ex){
        next(ex);
    }
});

module.exports = app;