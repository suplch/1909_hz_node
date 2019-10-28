// const db = require('./db');

//const { getClient, getStudentDB } = require('./db');



// console.log('开始获取客户端');
// let now = Date.now();
// console.log('111----' + now);
// getClient(function (client) {
//     console.log('111 end----' + (Date.now() - now));
//     console.log('获取到了 客户端')
//     //client.db('hang_zhou_students')
//
//     console.log('开始获取客户端222222');
//     now = Date.now();
//     console.log('222----' + now);
//     getClient(function (client) {
//         console.log('222 end----' + (Date.now() - now));
//         console.log('获取到了 客户端2222222')
//     });
//     console.log('开始获取客户端2222222');
//
//
// });

//console.log('开始获取客户端');


// getStudentDB(function (stuDb) {
//     stuDb.collection('students1904').find().toArray(function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//         console.log('-----------')
//         console.log(result);
//     });
// });
//
//
// getStudentDB(function (stuDb) {
//     stuDb.collection('students1904').find().toArray(function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//         console.log('-----------')
//         console.log(result);
//     });
// });

const db_await = require('./db_await');
//const { getClient }  = require('./db_await');

async function doBusiness() {
    // let client = await db_await.getClient()
    // client.db()

    let stuDb = await db_await.getStudentDB();
    stuDb.collection('students1904').find().toArray(function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('-----------');
        console.log(result);
    });

    try {
        let result = await db_await.addStudent({name: 'zhang'});
        console.log(result.count, result.lastId);
    } catch( err ) {
        console.log(err);
    }


}


doBusiness();
