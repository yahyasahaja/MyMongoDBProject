const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const { url } = require('./config/database');
const { User } = require('./app/model/User');

var app = express();
app.use(bodyParser.json());

//DATABASE CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(url);

// var usr = new User();
// usr.email = 'yahya@mail.com';
// usr.save().then(doc => console.log(usr), err => console.log(err));

//ROUTER
app.get('/todos', (req, res) => {
    User.count().then(n => res.send(`we have ${n} data`), err => res.send(`Unable to fetch data: ${err}`));
});

app.get('/todos/:id', (req, res) => {
    let { id } = req.params;

    User.findById(id).then(user => {
        if (!user) return res.status(404).send(`User with id ${id} is not found`);
        res.status(200).send(`User email is: ${user.email}`);
    }, err => res.status(400).send('Bad request'));
});

app.post('/todos', (req, res) => {
    var { email } = req.body;
    var user = new User();
    user.email = email;
    user.save().then(doc => res.send(doc), err => res.status(401).send(err));
});

app.listen(port, () => console.log(`Server running on port ${ port }`));