const mongodb = require('mongodb');
//const MongoClient = mongodb.MongoClient;
const { MongoClient } = mongodb;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'hang_zhou_students';

let cacheClient;
let cacheDb;

function getClient(callback) {

    if (cacheClient) {
        console.log('获取客户端 通过缓存')
        setTimeout(function () {
            callback(cacheClient);
        }, 0)

        return;
    }

    MongoClient.connect(DB_URL,{ useUnifiedTopology: true }, function (err, client) {
        if (err) {
            return console.log(err);
        }
        console.log('获取客户端 通过网络连接')
        cacheClient = client;

        callback(cacheClient);
    });
}


function getStudentDB(callback) {
    if (cacheDb) {
        // setImmediate(function () {
        //     callback(cacheDb);
        // })
        process.nextTick(function () {
            callback(cacheDb);
        });
    }
    getClient(function (client) {
        let db = client.db(DB_NAME);
        cacheDb = db;
        callback(cacheDb);
    });
}


module.exports = {
    getClient,
    getStudentDB
};
