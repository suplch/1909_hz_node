const path = require('path');
const jwt = require('jsonwebtoken');


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const tokenParser = require('./middleware/token-parser');


const {getStudents, addStudent} = require('./db_await');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


// 自定义中间件, 用来校验 cookie token
app.use(tokenParser());


app.get('/hello', function (req, res) {
    res.send({name: 'hello 张三'});
});


app.get('/students', async function (req, res) {


    let students = await getStudents({sex: req.query.sex});
    res.send(students);

});

app.post('/add_student', async function (req, res) {

    console.log(req.body);

    let ret = await addStudent(req.body);

    // ....

    res.send(ret)


});


app.post('/login', function (req, res) {
    const {name, password} = req.body;

    if (name === 'zhang' && password === '123') {

        jwt.sign({name: 'zhang'}, 'abcdefg', function (err, token) {
            if (err) {
                res.send({
                    ok: false,
                    msg: 'token 生成失败'
                });
                return;
            }

            res.cookie('token', token);

            res.send({
                ok: true,
                msg: '登录成功'
            })
        });
    } else {
        res.send({
            ok: false,
            msg: 'err'
        })
    }
})




const port = 5000;
app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log(`服务已经启动, 请访问 http://localhost:${port} 端口`)

});
