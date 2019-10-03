const express = require('express');
const app = express();
const db = require('./assets/db');
const path = require('path');
const babel = require('@babel/core');
const fs = require('fs');

const port = process.env.PORT || 3000;

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




app.use('/assets', express.static(path.join(__dirname, 'assets')));



app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


db.syncAndSeed()
    .then(app.listen(port, ()=> console.log(`Listening on port ${port}`)));