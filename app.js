const express = require('express');
const app = express();
const mongosse = require('mongoose');


const users = [
    {
        id: 1,
        name: 'Sai'
    },
    {
        id: 2,
        name: 'Krishna'
    },
    {
        id: 3,
        name: 'Charlie'
    }
];

app.use(express.json); //using express middleware. this will parse our request.
mongosse.connect('mongodb://localhost:27017/newtest');

app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/users', function(req, res) {
    res.send(users);
})

app.get('/users/:id', function(req, res) { // we can use many url params like /users/:id/:date
    //const user = users.find(user => user.id == parseInt(req.params.id))  //req.params.id is the one which we are passing from above line.
    //res.send(user);

    //if query is passed in the url like http://localhost:3000/users/1?name=Sai
    res.send(req.query.name) // we can get the query params like req.query.name
})

app.post('/users', function(req, res) {
    const user = {
        id: users.length+1,
        name: req.body.name
    }

    users.push(user);
    res.send(user);
})

app.put('/users/:id', function(req, res) {
    const user = users.find(user => user.id == parseInt(req.params.id)) 
    user.name = req.body.name;
    res.send(user);
})

app.delete('/users/:id', function(req, res) {
    const user = users.find(user => user.id == parseInt(req.params.id)) 
    if(!user) return res.status(404).send("not found");
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
})

app.listen(3000, function() {
    console.log("listening on port 3000..")
})