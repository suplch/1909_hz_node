const mongodb = require('mongodb');
//const MongoClient = mongodb.MongoClient;
const { MongoClient } = mongodb;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'hang_zhou_students';

let cacheClient;
let cacheDb;

function getClient() {
    return new Promise(function (resolve, reject) {
        if (cacheClient) {
            console.log('获取客户端 通过缓存')
            resolve(cacheClient)
            return;
        }
        MongoClient.connect(DB_URL,{ useUnifiedTopology: true }, function (err, client) {
            if (err) {
                reject(err);
                return;
            }
            console.log('获取客户端 通过网络连接')
            cacheClient = client;
            resolve(cacheClient)
        });
    });
}


function getStudentDB() {
    return new Promise(async function (resolve, reject) {
        if (cacheDb) {
            resolve(cacheDb)
        }
        try {
            let client = await getClient();
            cacheDb = client.db(DB_NAME);
            resolve(cacheDb)
        } catch (err) {
            reject(err)
        }


    });
}


async function addStudent(student) {
    let db = await getStudentDB();
    return new Promise(function (resolve, reject) {
        db.collection('students1904').insertOne(student, function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve({
                count: result.insertedCount,
                lastId: result.insertedId
            })
        })
    });
}

async function getStudents(filter) {
    let db = await getStudentDB();
    return new Promise(function (resolve, reject) {
        db.collection('students1904').find(filter).toArray(function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result)
        });
    });
}

async function getUser(name, password) {
    let db = await getStudentDB();
    return new Promise(function (resolve, reject) {
        db.collection('users').findOne({name, password}, function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve(result)
        })
    });
}


async function addUser(user) {
    let db = await getStudentDB();
    return new Promise(function (resolve, reject) {
        db.collection('users').insertOne(user, function (err, result) {
            if (err) {
                return reject(err);
            }
            resolve({
                count: result.insertedCount,
                lastId: result.insertedId
            })
        })
    });
}


module.exports = {
    getClient,
    getStudentDB,
    addStudent,
    getStudents,
    addUser,
    getUser
};
