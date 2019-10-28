const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const {getStudents, addStudent} = require('./db_await');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'static')));


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




const port = 5000;
app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }

    console.log(`服务已经启动, 请访问 http://localhost:${port} 端口`)

});
