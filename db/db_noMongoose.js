const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongoUrl = 'mongodb://localhost:27017';

exports.findAll = function (res) {
    MongoClient.connect(mongoUrl, function (err, client) { 
        if (err) throw err;

        var db = client.db('mydb');
        db.collection('customers').find({}).toArray(function (err, result) {
            if (err) throw err;
            client.close();
            res.json({ data: result });
        });
    });
};

exports.findOne = function (res, id) {
    MongoClient.connect(mongoUrl, function (err, client) {
        if (err) throw err;
        var db = client.db('mydb');
        var query = { _id: new ObjectID(id) };
        db.collection('customers').find(query).toArray(function (err, result) {
            if (err) throw err;
            client.close();
            res.json({ data: result });
        });
    });
};
