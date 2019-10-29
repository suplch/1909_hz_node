const path = require('path');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    // 给上传文件重命名
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split('.');

        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({
    storage: storage
});


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const tokenParser = require('./middleware/token-parser');


const {getStudents, addStudent, addUser, getUser} = require('./db_await');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


// 自定义中间件, 用来校验 cookie token
app.use(tokenParser());

app.post('/upload-single', upload.single('logo'), function (req, res) {
    console.log(req.file);

    console.log('文件类型：%s', req.file.mimetype);
    console.log('原始文件名：%s', req.file.originalname);
    console.log((req.file.originalname).split("."));
    console.log('文件大小：%s', req.file.size);
    console.log('文件保存路径：%s', req.file.path);
    console.log(req.body.username);
    res.send({
        ret_code: '0',
        filepath: req.file.path
    });
});

app.get('/getimg', function (req, res) {


    let p = path.resolve('.', 'uploads', 'logo-1572320581922.jpg');
    console.log(p);

    res.sendFile(p);
});

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


app.post('/login', async function (req, res) {
    const {name, password} = req.body;

    const md5 = crypto.createHash('md5');

    let pwd = md5.update(password).digest('hex');

    let user = await getUser(name, pwd);
    console.log(user);
    if (user) {

        jwt.sign({id: user._id, name: user.name}, 'abcdefg', function (err, token) {
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
});

app.post('/register', async function (req, res) {
    const {name, password} = req.body;

    const md5 = crypto.createHash('md5');

    let pwd = md5.update(password).digest('hex');


    let ret = await addUser({name, password: pwd});

    if (ret.count === 1) {
        res.send({
            ok: true,
            msg: '注册ok'
        })
    } else {
        res.send({
            ok: false,
            msg: '注册error'
        })
    }
});




const port = 5000;
app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log(`服务已经启动, 请访问 http://localhost:${port} 端口`)

});
