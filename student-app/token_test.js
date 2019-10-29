const jwt = require('jsonwebtoken');

// 不要告诉其他人  秘密字符串;
const secret = 'mimizifuc'

const token = jwt.sign({name: '张三', sex: '男'}, secret, { expiresIn: 3 });


console.log(token);


setTimeout(function () {
    const obj = jwt.verify(token, secret);

    console.log(obj);
}, 10);





// jwt.sign("hello", secret, function (err, token) {
//     console.log(token);
// });
//
//
// jwt.verify(token, secret, function (err, obj) {
//     console.log(otj);
// });
