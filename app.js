const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) return console.log("Unable to connect to MongoDB server");
    console.log("Connected to MongoDB server");

    db.collection('Todos').find().toArray().then((user) => {
        console.log('Todos colelction data is fetched');
        console.log(JSON.stringify(user, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) console.log('Unable to insert todo');
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Yahya Sahaja',
    //     age: 19,
    //     location: 'Purwokerto'
    // }, (err, result) => {
    //     if (err) console.log('Unable to insert data to Users');
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.close();
});