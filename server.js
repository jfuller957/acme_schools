const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const babel = require('@babel/core');
const fs = require('fs');
const { Student, School } = db.models;
const port = 3003;

db.syncAndSeed()
    .then(()=> app.listen(port, ()=> console.log(`Listening on port ${port}`)));

// parse incoming requests to add
app.use(express.json());

app.get('/api/students', async(req, res, next)=> {
    try {
        res.send(await Student.findAll({ include: [School] }));
    }
    catch(ex){
        next(ex);
    }
});

app.put('/api/students', async (req, res, next) => {
    try {
        const changed = await Student.update(req.body, { where: { id: req.body.id }, returning: true });
        res.send(await Student.findAll({ include: [School] }));
        // console.log(changed[1]);
        // res.send(changed[1]);
    }
    catch (ex) {
        next(ex);
    }
});

app.post('/api/students', async(req, res, next)=> {
    try {
        res.send( await Student.create(req.body));
    }
    catch(ex){
        next(ex);
    }
});

app.delete('/api/students', async(req, res, next)=> {
    try{
        await Student.destroy({where: {id: req.body.id}})
        .then(res.sendStatus(204));
    }
    catch(ex){
        next(ex);
    }
});


app.get('/api/schools', async(req, res, next)=> {
    try {
        res.send( await School.findAll({ include: [Student] }));
    }
    catch(ex){
        next(ex);
    }
});

app.post('/api/schools', async(req, res, next)=> {
    try {
        res.send( await School.create(req.body));
    }
    catch(ex){
        next(ex);
    }
});
    

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

babel.transformFile('./client/app.js', {presets: ['@babel/react']}, (err, result)=> {
    if(err){
        console.log(err);
    }
    else {
        fs.writeFile('./assets/app.js', result.code, (err)=> {
            console.log(err);
        });
    }
});