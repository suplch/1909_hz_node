const mongodb = require('mongodb');

//const MongoClient = mongodb.MongoClient;

const { MongoClient } = mongodb;

const DB_URL = 'mongodb://localhost:27017';

function search() {
    MongoClient.connect(DB_URL, function (err, client) {
        if (err) {
            return console.log(err);
        }

        const db = client.db('hang_zhou_students');

        db.collection('students1904').find({sex: '男'}).toArray(function (err, result) {
            if (err) {
                return console.log(err);
            }
            console.log(result);
            client.close();
        });
    });
}

//search();

function insertData() {
    MongoClient.connect(DB_URL,  { useUnifiedTopology: true }, function (err, client) {
        if (err) {
            return console.log(err);
        }

        const db = client.db('hang_zhou_students');

        db.collection('students1904').insertOne({name: '小李', sex: '男', age: 18}, function (err, result) {
            if (err) {
                return console.log(err);
            }

            console.log(result.insertedCount);
            console.log(result.insertedId);
            console.log(`插入${result.insertedCount}条数据数据`)
        });
    });
}
//insertData();


function updateData() {
    MongoClient.connect(DB_URL,  { useUnifiedTopology: true }, function (err, client) {
        if (err) {
            return console.log(err);
        }

        const db = client.db('hang_zhou_students');

        db.collection('students1904').updateOne({name: 'zzz'}, {$set: {name: '小张'}}, function (err, result) {
            if (err) {
                return console.log(err);
            }

            console.log(result.modifiedCount);
            console.log(result.matchedCount);

            console.log('数据被修改')
        })
    });
}
//updateData();


function deleteData() {
    MongoClient.connect(DB_URL,  { useUnifiedTopology: true }, function (err, client) {
        if (err) {
            return console.log(err);
        }

        const db = client.db('hang_zhou_students');

        db.collection('students1904').deleteMany({score: undefined}, function (err, result) {
            if (err) {
                return console.log(err);
            }

            console.log(result.deletedCount);
            console.log('数据删除')
            client.close();
        })
    });
}
deleteData();
