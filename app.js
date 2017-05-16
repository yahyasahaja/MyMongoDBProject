const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const { url } = require('./config/database');
const { User } = require('./app/model/User');

var app = express();
app.use(bodyParser.json());

//DATABASE CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(url);

//ROUTER
app.get('/todos', (req, res) => {
    User.count().then(n => res.send(`we have ${n} data`), err => res.send(`Unable to fetch data: ${err}`));
});

app.post('/todos', (req, res) => {
    var { email } = req.body;
    var user = new User();
    user.email = email;
    user.save().then(doc => res.send(doc), err => res.status(401).send(err));
});

app.listen(port, () => console.log(`Server running on port ${ port }`));