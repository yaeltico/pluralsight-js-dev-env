import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3001;
const app = express(); // create instance of express

/* This is NOT for actual production use. 
    This is just useful for hosting the minified prodiction build 
    for local debugging purposes 
*/
app.use(compression()) // enable gzip compression
app.use(express.static('dist')); // enable the express web server

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//no need after deployment in production
// app.get('/users', function(req, res) {
//     // Hard coding for simplicity. pretend this hits a real database
//     res.json([
//         {"id": 1, "firstName":"Bob", "lastName": "Smith", "email": "bob@gmail.com"},
//         {"id": 2, "firstName":"Tammy", "lastName": "Norton", "email": "tnorton@gmail.com"},
//         {"id": 3, "firstName":"Tina", "lastName": "Lee", "email": "lee.tina@gmail.com"},
//     ]);
// });

app.listen(port, function (err) {
    if(err) {
        console.log(err);
    } else {
        open('http://localhost:' + port);
    }
});